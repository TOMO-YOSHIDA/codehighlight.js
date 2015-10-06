"use strict";
interface SanitizeItem {
	regex: RegExp;//置換対象正規表現
	str: any;//変換後の文字列
};
interface CodeStructure {
	class: string;//
	regex: string;//置換対象正規表現
	str?: string;//変換後の文字列
};

interface httpParam {
	url: string;
	callback: (ev: ProgressEvent) => {};
	method?: string;
}

!function(g) {

	// 手抜き用変数
	let d = document;

	//行番号を作成する関数
	let makeLineNumber = (idx: number) => `<div class="ln">${idx}</div>`;

	// サニタイズ実行関数 特定文字を&#0001;形式に変換する
	let sanitizer = (s = "") => s.replace(/['"<>&`]/g, (c) => `&#${c.charCodeAt(0) };`);

	//変換定義・書体定義を書く
	let template: { [lang: string]: CodeStructure[] } = {};

	// ハイライト変換(中間コード)
	let highlight = (code: string = "", lang: string = ""): string => {
		let temp = template[lang.toLowerCase()];
		if (!temp || !code) return code;

		console.log(`do highlight: ${lang}`);
		temp.forEach((c: CodeStructure) => {
			if (!c.regex) return;
			if (!c.str) c.str = '`' + c.class + '`$1``';

			code = code.replace(new RegExp(c.regex, 'g'), c.str);
		});

		return code;
	};

	// 中間コードを最終コードに変換
	let highlight2 = (regexp: RegExp, code: string = "") =>
		code
			.replace(regexp, '')
			.replace(/([^`]|^)`([^`]+)`/g, '$1<span class="$2">')
			.replace(/`{2}/g, '</span>');

	// 行頭のtabをスペースに変換する関数
	let tab2space = (str = "") => str.replace(/^\t+/, (s) => s.replace(/\t/g, "    "));

	// 公開名はwindow.chl
	g.chl = {
		// javascriptをロード・実行する関数
		loadTemplate: (type: string) => {
			let h = new XMLHttpRequest();

			h.onreadystatechange = function(ev: ProgressEvent) {
				if (h.readyState === 4 && h.status === 200) {
					console.log(`loaded ${type}-template.json`);

					let structure = JSON.parse(h.responseText);
					for (let key in structure) {
						g.chl.addTemplate(key, structure[key]);
					}

					g.chl.execute();
				}
			}
			h.open('GET', `./js/${type}-template.json`, true);
			h.send(null);
		},
		// templateの追加を受け付ける関数
		addTemplate: (lang: string, structures: CodeStructure[]) => {
			template[lang] = structures;
		},

		// code highlight実行関数
		execute: (target?: NodeListOf<HTMLScriptElement>) => {
			let scripts = target || d.getElementsByTagName('script');
			// scriptsはforEachで回せない、scriptブロックは返還後に削除するので後ろから回す
			for (let i = scripts.length; --i >= 0;) {
				let s = scripts[i];

				// 変換対象かをチェック
				if (!/^code/.test(s.type)) continue;

				// コードの言語を取得
				var lang = s.type.split('/')[1];
				if (!template[lang]) continue;

				// titleの作成
				var title = `<div class="title">${s.title}${lang ? ' / ' : ''}${lang}</div>`;

				// codeを取得・サニタイズ・最初と最後の空行を削除
				var codelist = sanitizer((s.innerHTML || '').replace(/^\s*[\r\n]+|\s*$/g, ''));
				codelist = highlight(codelist, lang);

				// 行の始まりの空白をカウント
				var lines = codelist.split(/[\r\n]+/g);
				var mintab = 1000;
				lines.forEach((line, i) => {
					lines[i] = line = tab2space(line);
					let indent = /^(\s*)/.exec(line);
					if (indent[1]) {
						mintab = Math.min(indent[1].length, mintab);
					}
				});

				// 行の始まりを合わせる
				var rep = new RegExp(`^\\s{${mintab}}`);
				var cnt = 1;
				lines.forEach((line, i) => {
					lines[i] = makeLineNumber(cnt++) + highlight2(rep, line);
				});

				// 整形リストelementの生成
				let newTag = d.createElement('pre');
				newTag.setAttribute('class', 'code highlight');
				newTag.innerHTML = title + '<code>' + lines.join('<br>') + '</code>';

				// 親に追加
				s.parentElement.insertBefore(newTag, s);

				// もともとのscriptブロックは削除
				s.remove();
				console.log(`remove:${s.title}`);
			}
		},
	};
	g.chl.loadTemplate('default');
} (this);
