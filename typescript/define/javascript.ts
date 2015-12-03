CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:js|javascript|ecma(?:script)?\d*|es\d*|ts|typescript)$/i,
	defAsCode: [
		{
			// 数字リテラル
			class: "premitive",
			regex: /([\W])([+\-]?[\d\.]+)/g,
			str: "$1`$2`"
		},
		{
			// プリミティブ
			class: "premitive",
			regex: /\b(true|false|NaN|null|undefined|void|Infinity)\b/g
		},
		{
			// 予約語
			class: "keyword",
			regex: /\b(break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|while|with|class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/g
		},
		{
			// ビルトイン関数など
			class: "builtin",
			regex: /\b(escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|Array|Boolean|Date|Error|EvalError|Function|JSON|Math|Number|Object|RegExp|ReferenceError|RangeError|String|SyntaxError|TypeError|URIError|console|debugger)\b/g
		}
	],
	defNoCode: [
		{
			/* 複数行コメント */
			class: "comment",
			start: /\/\*/,
			regex: /(\/\*[\w\W]+?\*\/)/
		},
		{
			// 単一行コメント
			class: "comment",
			start: /\/\//,
			regex: /(\/\/.*?)([\r\n]+|$)/,
			str: "`$1`$2"
		},
		{
			// 文字列
			class: "literal",
			escape: '\\',
			start: /['"`]/,
			regex: /(['"`])(\1|.*?[^\\]\1)/,
			str: "`$1$2`"
		},
		{
			// 正規表現
			class: "regexp",
			start: /(?:^|[\(\{\[=,:;\/])\s*\/(?![\*\/]).*?[^\\]\/[gim]*/,
			regex: /((?:^|[\(\{\[=,:;\/])\s*)(\/(?![\*\/]).*?[^\\]\/[gim]*)/,
			str:'$1`$2`'
		},
	]
});
