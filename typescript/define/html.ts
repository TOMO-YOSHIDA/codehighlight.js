CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:html)$/i,
	defAsCode: [

		// {
		// 	// properties
		// 	class: "buildin",
		// 	regex: /<\w+?\s+?/g
		// },

		{
			// start tags
			class: "keyword",
			regex: /<(\s*\w+)/g,
			str: "<`$1`"
		},
		{
			// end tags
			class: "keyword",
			regex: /(<\/)(\w+)(>)/g,
			str: "$1`$2`$3"
		},
	],
	defNoCode: [
		{
			/* 複数行コメント */
			class: "comment",
			start: /<!--/,
			regex: /(<!--[\w\W]*?-->)/g
		},
		{
			// 文字列
			class: "literal",
			escape: '\\',
			start: /['"`]/,
			regex: /(['"`])(.*?[^\\]\1)/,
			str: "`$1$2`"
		},
	]
});
