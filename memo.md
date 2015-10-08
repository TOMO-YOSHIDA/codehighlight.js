# codehighlight.js

## 開発メモ
templateの外部化
### JSONに持たせる情報を分ける
* version:バージョン
* alias:アクセス用の名前
* templates:定義リスト
	+ class:表示用cssクラス
	+ regex:マーク条件
	+ str:変換用文字列の定義(未定義ならdefault:\`keyword\`$1\`\`が使われます)


## 概要
`<script type="code/hoge">〜</script>`で囲われた範囲をいい具合に整形して表示する。

## 特徴
### 良い特徴
* コード中にHTMLタグが出現してもOK
* jQuery不要
* 日本語ドキュメント

### 悪い特徴
* Javascriptが実行できない環境では何も表示されない
* Javascript実行中も表示されない
* 対応している言語が少ない
* マークダウンで書けないでござる?
* Japanese document only

## 使い方
* 表示させたいコードを`script`タグでかこむ
* `type`属性は"code"で始まること
* コード中に`</script>`が出現するとそこで終わってしまいます。<br>
`"<" + "/script>"`<br>
の様に、なんとか終了タグにならないように書いてください。


### 書き方の例:
```
<script type="code/javascript>
	var a  = [1,2,3];
	console.log(a);
</script>
```