"use strict";

namespace CodeHighlight {

	// テンプレートのロード & 再実行
	export function loadTemplate(url: string) {
		TemplateManager.loadTemplate(url);
	}
	// テンプレートの追加はTemplateManagerに委譲
	export function addTemplate(def: CodeStructure) {
		TemplateManager.addTemplate(def);
		// this.execute(); // 連続追加も考慮して即実行はしない
	};

	// code highlight実行関数
	export function execute(scripts?: NodeListOf<HTMLScriptElement> | NodeListOf<HTMLPhraseElement>) {
		if (scripts) {
			CodeHighlight.highlight(scripts);
		} else {
			CodeHighlight.highlight(document.getElementsByTagName('script'));
			CodeHighlight.highlight(document.getElementsByTagName('code'));
		}
	}

	export function highlight(scripts?: NodeListOf<HTMLScriptElement> | NodeListOf<HTMLPhraseElement>) {

		// scriptsはforEachで回せない、scriptブロックは変換後に削除するので後ろから回す
		for (let i = scripts.length; i--;) {
			var s = scripts[i];

			var type = s.getAttribute('type');

			// 変換対象かをチェック
			if (!/^code\/.+$/.test(type)) continue;

			// コードの言語を取得
			var lang = type.split('/')[1];

			var template: CodeStructure = TemplateManager.getTemplate(lang);
			if (!template) continue; // テンプレートがない場合も処理しない

			// titleの作成
			var title = `<div class="title">${s.title ? `${s.title} / ` : ''}${lang}</div>`;

			// CrLf -> Lf, コードの最初と最後の空白を除去して改行でsplit
			var lines = s.innerHTML.replace(/^[\s]*?\n|\r|[\s\r\n]*$/g, '').split(/\n/g);

			// 行の始まりの空白をカウント
			var mintab = Infinity;
			lines.forEach(function(line, i) {
				// 行頭のtabをスペースに変換する関数
				lines[i] = line = line.replace(/^[ \t]+/, function(s) { return s.replace(/\t/g, "    "); });;
				var indent = /^(\s*)/.exec(line);
				if (indent[1]) {
					mintab = Math.min(indent[1].length, mintab);
				}
			});

			// 行の始まりを合わせる
			var rep = new RegExp(`^\\s{${mintab}}|[\\s]*$`, 'g');
			lines.forEach(function(line, i) {
				lines[i] = line.replace(rep, '');
			});

			// やっとcodeオブジェクトに変換
			var codes = [new Code(lines.join('\n'))];

			// nocodeのマーキング
			var ret: Code[] = [];
			codes.forEach(function(code) {
				code.markNoCodeAndStore(template.defNoCode, ret)
			});
			codes = Code.flatten(ret);

			// codeのマーキング
			template.defAsCode.forEach(function(def) {
				ret = [];
				codes.forEach(function(code) {
					code.markCodeAndStore(def, ret);
				});

				// flatten code. タグ無しのコード同士は連結
				codes = Code.flatten(ret);
			});

			// 行番号リストを作成
			var numbers = "", cnt = 1;
			for (var cnt = 1, len = lines.length; cnt <= len; cnt++) {
				numbers += `<div>${cnt}</div>`;
			}

			// // 整形リストelementの生成
			var newTag = document.createElement('div');
			newTag.setAttribute('class', 'chl');
			newTag.setAttribute('title', s.title);
			newTag.innerHTML = title + '<code><div class="no">' + numbers + '</div><div class="code"><div>' + codes.join('') + '</div></div></code>';

			// 親に追加
			s.parentElement.insertBefore(newTag, s);

			// もともとのscriptブロックは削除
			s.remove();
		}
	}
}
