"use strict";
namespace CodeHighlight {
	export class Code {
		public static M = "C_H_L";

		// tag
		public tag: string = void 0;
		public replaced = false;

		// コンストラクタでcodeを保持
		constructor(private code: string, def?: CodeDefine) {
			// 変換対象の場合、tagをつける
			if (/C_H_L/.test(code)) {
				this.code = code.replace(/C_H_L/g, '');
				this.tag = def.class;
				if (def.fnc) {
					this.replaced = true;
				}
			}
		}

		// このクラスをstringにする場合はHTMLタグ付きにして返す
		public toString(): string {

			var s = this.code;

			if(this.replaced) {
				return s;
			}

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

			// 特定のキーワードをMARKER付きに変換する
			// 例："`var` a = 1;"
			let temp: string;
			if (def.fnc) {
				temp = this.code.replace(def.regex, def.fnc);
			} else {
				// キーワード変換用。def.strが宣言されていなければ`$1`
				let repstr = (def.str || '`$1`').replace(/`/g, Code.M);
				temp = this.code.replace(def.regex, repstr);
			}

			// キーワードとそれ以外を独立したcodeに分割する
			// 例：["`var`", "a = 1;"]
			let lines = temp.split(/(C_H_L[\w\W]+?C_H_L)/);

			// string[] -> Code[]
			lines.forEach(function(line) {
				ret.push(new Code(line, def));
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
