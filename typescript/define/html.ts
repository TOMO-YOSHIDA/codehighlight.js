CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:html)$/i,
	define: [
		{
			/* 複数行コメント */
			class: "comment",
			regex: /(<\!\-\-[\w\W]*?\-\->)/g
		},

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
	]
});
