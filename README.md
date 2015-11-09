# codehighlight.js

## 概要
`<script type="code/hoge">〜</script>`で囲われた範囲をいい具合に整形して表示する。

## install
`bower install codehighlight.js`

## 特徴
### 良い特徴
* コード中に`<`,`>`やHTMLタグが出現してもOK
* jQuery不要
* 日本語ドキュメント

### 悪い特徴
* Javascriptが実行できない環境では何も表示されない
* 対応している言語が少ない
* Japanese document only

## 使い方
* 表示させたいコードを`script`タグでかこむ
* `type`属性は"code/javascript"の様に書く
* codehighlight.jsをロード
* ページの最後で`CodeHighlight.execute();`を実行
* コード中に`</script>`が出現するとそこで終わってしまいます。<br>
`"<" + "/script>"`<br>
の様に、なんとか終了タグにならないように書いてください。


### 書き方の例:
```
<script type="code/javascript">
	var a  = [1,2,3];
	console.log(a);
</script>
```

### ハイライト用定義ファイル.ts
typescriptで書くと構造がマッチしていないと怒られるので`typescript/define/javascript.ts`を参考に。
* version:バージョン(未使用)
* lang:プログラム言語にヒットするための正規表現
* defines:定義リスト
	+ class:表示用cssクラス
	+ regex:マーク条件
	+ str:変換用文字列の定義(default:\`$1\`)
