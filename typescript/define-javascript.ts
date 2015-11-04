!function() {
	CodeHighLight.addTemplate({
		version: "0.0.1",
		type: "ecma",
		alias: [
			"js",
			"javascript",
			"ts",
			"typescript",
			"ecma",
			"ecma5",
			"ecma6",
			"ecmascript",
			"ecmascript5",
			"ecmascript6",
			"es",
			"es5",
			"es6"
		],

		/*
			--- サニタイズ文字一覧 ---
			' : &#39; シングルクォート
			" : &#34; ダブルクォート
			< : &#60; 小なり
			> : &#62; 大なり
			& : &#38; ＆記号
			` : &#96; バッククォート

			---参考：ここから先は使わない---
			/ : &#47; スラッシュ
		*/
		"define": [
			{
				// 予約語
				class: "keyword",
				regex: /\b(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|while|with|class|enum|export|extends|import|super|implements|interface|let|package|private|protected|public|static|yield)\b/g
			},
			// {
			// 	// 正規表現
			// 	class: "regexp",
			// 	// regex: /(\/.+?[^\\]\/[gim]*)\b/g
			// 	regex: /(\/(?!\\\/)+?\/[gim]*)\b/g
			// },
			{
				// 単一行・行末コメント
				class: "comment",
				regex: /((?:\/){2}.*?)(?:[\r\n]+|$)/g,
				str: "`comment`$1`/`\n"
			},
			{
				/* 複数行コメント */
				class: "comment",
				regex: /(\/\*[\w\W]+?\*\/)/g
			},

			{
				// (&#39;シングルクォート, &#34;ダブルクォート, &#96;バッククォート)
				// 文字列リテラル
				class: "literal",
				regex: /(&#39;|&#34;|&#96;)([^\1]*?)\1/g,
				str: "`literal`$1$2$1`/`"
			},
			{
				// 数字リテラル
				class: "premitive",
				regex: /([\s,\(\)\{\}\[\]]|^)(-?\d*\.*\d*)\b/g,
				str: "$1`premitive`$2`/`"
			},
			{
				// プリミティブ
				class: "premitive",
				regex: /[^"'\B](true|false|NaN|null|undefined|void)[^"'\B]/g
			},

			{
				// 関数定義と思われるもの。コール箇所をハイライト
				class: "function",
				regex: /\.([^\d\.]?[\d\w]*?\s*)\(/g,
				str: ".`_function`$1`/`(",// 無効: クラス名から_を抜けば有効
			}
		]
	});
} ()
