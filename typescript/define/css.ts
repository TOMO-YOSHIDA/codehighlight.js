CodeHighlight.addTemplate({
	version: "0.0.1",
	lang: /^(?:stylesheet|css[\d]*|less)$/i,
	define: [
		{
			/* 複数行コメント */
			class: "comment",
			regex: /(\/\*[\w\W]+?\*\/)/g
		},

		{
			// properties
			class: "keyword",
			regex: /(^|[;{\r\n])([\s]*)(.*?):/g,
			str: "$1$2`$3`:"
		},

		{
			// color
			class: "literal",
			regex: /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb[a]?\([^\)]*?\)/g,
			fnc: function(v: string) {
				return `@__@@${v}<span class="color-block" style="background:${v};"></span>@__@@`;
			}
		},
		{
			// values
			class: "literal",
			regex: /:(.*?)([;\r\n])/g,
			str: ":`$1`$2"
		},
	]
});
