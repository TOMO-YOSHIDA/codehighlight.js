interface CodeDefine {
	class: string;//
	regex: RegExp;//置換対象正規表現
	str?: string;//変換後の文字列
}

interface CodeStructure {
	version: string;
	type: string;//タイプ
	alias: RegExp;//別名
	define: CodeDefine[];
}

namespace CHL {
	export class TemplateManager {

		private static contains(a: any[], v: any): boolean {
			let ret = false;
			for (let i = a.length; i--;) {
				ret = ret || a[i] === v;
				if (ret) break;
			}
			return ret;
		};

		public static templates: CodeStructure[] = [];

		// javascriptをロード・実行する関数
		public static loadTemplate = (url: string, callback?: Function) => {
			let h = new XMLHttpRequest();

			h.onreadystatechange = function(ev: ProgressEvent) {
				if (h.readyState === 4 && h.status === 200) {

					let s = document.createElement('script');
					s.innerHTML = h.responseText;
					document.body.appendChild(s);

					if (typeof callback === 'function')
						callback();
				}
			}
			h.open('GET', url, true);
			h.send(null);
		};

		// templateの追加を受け付ける関数
		public static addTemplate = (structure: CodeStructure) => {
			let contains = TemplateManager.contains;
			let added = false;

			// 定義済みの定義体は上書き
			TemplateManager.templates.forEach((temp, idx) => {
				if (temp.alias.test(structure.type)) {
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
		public static getTemplate(lang: string = "some script"): CodeStructure {
			lang = lang.toLowerCase();
			let contains = TemplateManager.contains;

			for (let i = TemplateManager.templates.length; i--;) {
				if (TemplateManager.templates[i].alias.test(lang)) {
					return TemplateManager.templates[i];
				}
			}
		}
	}
}
