CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:js|javascript|ecma(?:script)?\d*|es\d*|ts|typescript)$/i,
	define: [
		{
			/* 複数行コメント */
			class: "comment",
			regex: /(\/\*[\w\W]+?\*\/)/g
		},
		{
			// 単一行・行末コメント
			class: "comment",
			regex: /(\/\/.*?)(?:[ \t]*[\r\n]+|$)/g,
			str: "`$1`\n"
		},
		{
			// 文字列リテラル
			class: "literal",
			regex: /(['"`])(.*?[^\\]\1)/g,
			str: "`$1$2`"
		},
		{
			// 数字リテラル
			class: "premitive",
			regex: /([\W])([+\-]?[\d\.]+)/g,
			str:"$1`$2`"
		},
		{
			// 正規表現
			class: "regexp",
			regex: /[\b]*(\/.*?[^\\]\/[gim]*)\b/g
		},
		{
			// プリミティブ
			class: "premitive",
			regex: /\b(true|false|NaN|null|undefined|void)\b/g
		},
		{
			// 予約語
			class: "keyword",
			regex: /\b(break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|while|with|class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/g
		},
		{
			// ビルトイン関数など
			class: "builtin",
			regex:/\b(escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|Array|Boolean|Date|Error|EvalError|Function|JSON|Math|Number|Object|RegExp|ReferenceError|RangeError|String|SyntaxError|TypeError|URIError|console|debugger)\b/g
		}
	]
});
