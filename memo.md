#codehighlight.js

##概要
`<script type="code/hoge">〜</script>`で囲われた範囲をいい具合に整形して表示する。

##特徴
###良い特徴
* コード中にHTMLタグが出現してもOK
* jQuery不要
* ドキュメントが日本語

###悪い特徴
* Javascript実行できない場合は何も表示されない
* 対応している言語がJavascriptだけ(TypeScriptは対応予定)
* マークダウンで書けないでござる
* ドキュメントが日本語のみ

##使い方
* 表示させたいコードを`script`タグでかこむ
* `type`属性は"code"で始まること
* コード中に`</script>`が出現するとそこで終わってしまいます。<br>
`"<" + "/script>"`<br>
の様に、なんとか終了タグにならないように書いてください。


###書き方の例:
```
<script type="code/javascript>
	var a  = [1,2,3];
	console.log(a);
</script>
```
##その他
そろそろ寝た方がいい