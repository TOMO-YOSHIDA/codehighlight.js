"use strict";

interface httpParam {
	url: string;
	callback: (ev: ProgressEvent) => {};
	method?: string;
}

interface CodeDefine {
	class: string;//
	regex: RegExp;//置換対象正規表現
	str?: string;//変換後の文字列
}

interface CodeStructure {
	version: string;
	type: string;//タイプ
	alias: string[];//別名
	define: CodeDefine[];
}

class CodeHighLight {

	// 超簡易版underscore.js
	private _ = {
		contains: function(a: any[], v: any): boolean {
			let ret = false;
			for (let i = a.length; i--;) {
				ret = ret || a[i] === v;
				if (ret) break;
			}
			return ret;
		}
	};

	//行番号を作成する関数
	private makeLineNumber = (idx: number) => `<div class="ln">${idx}</div>`;

	// サニタイズ実行関数 特定文字を&#0001;形式に変換する
	private sanitizer = (s = "") => s.replace(/^\s*[\r\n]+|[\s\r\n]*$/g, '').replace(/['"<>&`]/g, (c) => `&#${c.charCodeAt(0) };`);

	//変換定義・書体定義を書く
	private template: CodeStructure[] = [];

	// ハイライト変換(中間コード)
	private highlight1 = (code: string = "", lang: string = ""): string => {

		// 引数が無効な場合は抜ける(エラー無し)
		if (!lang || !code) return code;

		lang = lang.toLowerCase();
		code = this.sanitizer(code);

		// templateから対象のdefineリストを抽出
		let temps = this.template.filter(t => this._.contains(t.alias, lang));

		// defineリストごとにcodeを変換する
		temps.forEach(c => c.define.forEach((c: CodeDefine) => {
			if (!c.regex) throw "Error!! Template.CodeDefine.regex is undefined.";
			if (!c.str) {
				c.str = '`' + c.class + '`$1``';
			}

			code = code.replace(c.regex, c.str);
		}));

		return code;
	};

	// 中間コードを最終コードに変換
	private highlight2 = (regexp: RegExp, code: string = ""): string => {
		return code
			.replace(regexp, '')
			.replace(/([^`]|^)`([^`]+)`/g, '$1<span class="$2">')
			.replace(/`{2}/g, '</span>');
	}

	// 行頭のtabをスペースに変換する関数
	private tab2space = (str = ""): string => {
		return str.replace(/^\t+/, (s) => s.replace(/\t/g, "    "))
	};

	// 公開名はwindow.chl
	// javascriptをロード・実行する関数
	public loadTemplate = (url: string): void => {
		let h = new XMLHttpRequest();

		h.onreadystatechange = function(ev: ProgressEvent) {
			if (h.readyState === 4 && h.status === 200) {

				let s = document.createElement('script');
				s.innerHTML = h.responseText;
				document.body.appendChild(s);
			}
		}
		h.open('GET', url, true);
		h.send(null);
	};

	// templateの追加を受け付ける関数
	public addTemplate = (structure: CodeStructure) => {
		let added = false;

		// 定義済みの定義体は上書き
		this.template.forEach((temp, idx) => {
			if (this._.contains(temp.alias, structure.type)) {
				this.template.splice(idx, 1, structure);
				added = true;
			}
		});

		// 新定義なら追加
		if (!added) {
			this.template.push(structure);
		}

		// コード変換を実行
		this.execute();
	};

	// code highlight実行関数
	public execute = (target?: NodeListOf<HTMLScriptElement>) => {
		let scripts = target || document.getElementsByTagName('script');
		// scriptsはforEachで回せない、scriptブロックは返還後に削除するので後ろから回す
		for (let i = scripts.length; i--;) {
			let s = scripts[i];

			// 変換対象かをチェック
			if (!/^code/.test(s.type)) continue;

			// コードの言語を取得
			var lang = s.type.split('/')[1];
			if (!lang) continue; //未定義なら処理しない

			// titleの作成
			var title = `<div class="title">${s.title}${lang ? ` / ${lang}` : ''}</div>`;

			// codeを取得・サニタイズ・最初と最後の空行を削除
			var codelist = this.highlight1(s.innerHTML, lang);

			// 行の始まりの空白をカウント
			var lines = codelist.split(/[\r\n]+/g);
			var mintab = Infinity;
			lines.forEach((line, i) => {
				lines[i] = line = this.tab2space(line);
				let indent = /^(\s*)/.exec(line);
				if (indent[1]) {
					mintab = Math.min(indent[1].length, mintab);
				}
			});

			// 行の始まりを合わせる
			var rep = new RegExp(`^\\s{${mintab}}`);
			lines.forEach((line, i) => {
				lines[i] = this.makeLineNumber(i + 1) + this.highlight2(rep, line);
			});

			// 整形リストelementの生成
			let newTag = document.createElement('pre');
			newTag.setAttribute('class', 'code highlight');
			newTag.innerHTML = title + '<code>' + lines.join('<br>') + '</code>';

			// 親に追加
			s.parentElement.insertBefore(newTag, s);

			// もともとのscriptブロックは削除
			s.remove();
		}
	};
}

// 実行
!function(g) {
	g.chl = g.chl || new CodeHighLight();
} (this);
