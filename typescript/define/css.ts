CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:stylesheet|css[\d]*|less)$/i,
	defAsCode: [
		{
			// properties
			class: "builtin",
			regex: /(^|[;{\r\n])([\s]*)(.*?):/g,
			str: "$1$2`$3`:"
		},

		{
			// color
			class: "literal",
			regex: /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb[a]?\([^\)]*?\)/g,
			fnc: function(v: string) {
				return `C_H_L${v}<span class="color-block" style="background:${v};"></span>C_H_L`;
			}
		},

		{
			// selector
			class: "keyword",
			regex: /(^.*?)\{/,
			str: "`$1`{"
		},

		{
			// values
			class: "literal",
			regex: /:(.*?)([;\r\n])/g,
			str: ":`$1`$2"
		},
	],
	defNoCode: [
		{
			/* 複数行コメント */
			class: "comment",
			start: /\/\*/,
			regex: /(\/\*[\w\W]+?\*\/)/
		},
		{
			// 単一行コメント(for LESS)
			class: "comment",
			start: /\/\//,
			regex: /(\/\/.*?)([\r\n]+|$)/,
			str: "`$1`$2"
		},
		{
			// 文字列
			class: "literal",
			escape: '\\',
			start: /['"]/,
			regex: /(['"])(\1|.*?[^\\]\1)/,
			str: "`$1$2`"
		},
	]
});
