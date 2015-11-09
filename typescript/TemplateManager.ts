namespace CodeHighlight {

	export interface CodeDefine {
		class: string;//
		regex: RegExp;//置換対象正規表現
		str?: string;//変換後の文字列
		fnc?: (v: string, ...args: any[]) => string;
	}

	export interface CodeStructure {
		version: string;
		lang: RegExp;
		define: CodeDefine[];
	}

	export class TemplateManager {

		public static templates: CodeStructure[] = [];

		// javascriptをロード・実行する関数
		public static loadTemplate(url: string) {
			let h = new XMLHttpRequest();

			h.onreadystatechange = function(ev: ProgressEvent) {
				if (h.readyState === 4 && h.status === 200) {

					let s = document.createElement('script');
					s.innerHTML = h.responseText;
					document.body.appendChild(s);

					CodeHighlight.execute();
				}
			}
			h.open('GET', url, true);
			h.send(null);
		};

		// templateの追加を受け付ける関数
		public static addTemplate(structure: CodeStructure) {
			let added = false;

			// 定義済みの定義体は上書き
			TemplateManager.templates.forEach((temp, idx) => {
				if (temp.lang === structure.lang) {
					TemplateManager.templates.splice(idx, 1, structure);
					added = true;
				}
			});

			// 新定義なら追加
			if (!added) {
				TemplateManager.templates.push(structure);
			}
		};

		// テンプレートがあるか？
		public static getTemplate(lang: string): CodeStructure {
			if (!lang) return null;

			lang = lang.toLowerCase();

			// 見つかった時点でreturn するためforEachは使わない
			for (let i = TemplateManager.templates.length; i--;) {
				if (TemplateManager.templates[i].lang.test(lang)) {
					return TemplateManager.templates[i];
				}
			}
		}
	}
}
