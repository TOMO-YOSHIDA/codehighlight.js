"use strict";
namespace CHL {
	export class Code {
		public static M = "@__@@";

		// tag
		public tag: string = void 0;

		// コンストラクタでcodeを保持
		constructor(private code: string, cls?: string) {
			// 変換対象の場合、tagをつける
			if (/@__@@/.test(code)) {
				this.code = code.replace(/@__@@/g, '');
				this.tag = cls;
			}
		}

		// このクラスをstringにする場合はHTMLタグ付きにして返す
		public toString(): string {

			var s = this.code;

			// サニタイズ
			s = s.replace(/['"<>&`]/g, function(c) {
				return '&#' + c.charCodeAt(0) + ';';
			});

			// タグ無しならそのまま返す
			if (!this.tag) return '<span>' + s.replace(/[\r\n]/g, '<br></span></div><div><span>');

			let sTag = `<span class="${this.tag}">`,
				eTag = `</span>`;

			// 改行は</span>\r<span>に変換して複数行に備える
			return sTag
				+ s.replace(/[\r\n]/g, `${eTag}</div><div>${sTag}`)
				+ eTag;

		}

		// tagチェックしてCode[]にする！
		public markCodeAndStore(def: CodeDefine, ret: Code[]) {
			// すでにタグ付きならそのまま返す
			if (this.tag) return ret.push(this);

			// 例："var a = 1;" 基本はstringのまま扱う

			// キーワード変換用。def.strが宣言されていなければ`$1`
			let repstr = (def.str || '`$1`').replace(/`/g, Code.M);

			// 特定のキーワードをMARKER付きに変換する
			// 例："`var` a = 1;"
			let temp = this.code.replace(def.regex, repstr);

			// キーワードとそれ以外を独立したcodeに分割する
			// 例：["`var`", "a = 1;"]
			let lines = temp.split(/(@__@@[\w\W]+?@__@@)/);

			// string[] -> Code[]
			lines.forEach(function(line) {
				ret.push(new Code(line, def.class));
			})
		}

		// Code[]のtagなしをまとめる
		public static flatten(codes: Code[]): Code[] {
			let ret: Code[] = [];

			var s = "";
			codes.forEach(function(code) {
				if (code.tag) {
					if (s) {
						ret.push(new Code(s));
						s = "";
					}
					ret.push(code);
				} else {
					s += code.code;
				}
			});

			if (s) {
				ret.push(new Code(s));
			}
			return ret;
		}
	}
}
