# codehighlight.js

## 概要
`<script type="code/lang">〜</script>`で囲われた範囲のコードをハイライト表示する

## install
`bower install codehighlight.js`

## 特徴
### 良い特徴
* サニタイズ不要でコードを貼り付けられる
* codehighlight.cssとcodehighlight.jsのみで動作

### 悪い特徴
* Javascriptが実行できない環境では何も表示されない
* 対応している言語が少ない

## 使い方
* 表示させたいコードを`script`タグでかこむ
* `type`属性は"code/language"の様に書く
* codehighlight.jsをロード
* ページの最後で`CodeHighlight.execute();`を実行
* コード中に`</script>`が出現するとそこで終わってしまいます。この場合だけ`&lt;`の様にサニタイズで避けてください。<br>


### 書き方の例1:XML以外
```Javascript
<script type="code/javascript" title="sample js code">
	var a  = [1,2,3];
	console.log(a);
</script>
```

### 書き方の例：XML
scriptタグの中にXMLのタグが出現するとブラウザに怒られるのでcodeタグの中に書いてください。
```HTML
<code type="code/html" title="sample html code">
	<!-- comment -->
	<div class="code-highlight">
		<h1>HELLO CODE HIGHLIGHT!!</h1>
	</div>
</code>
```


<script type="code/javascript" title="sample code">
	var a  = [1,2,3];
	console.log(a);
</script>
<link rel="text/css" href="dist/codehighlight.min.css"></link>
<script src="dist/codehighlight.min.js"></script>
<script>CodeHighlight.execute()</script>

### ハイライト用定義ファイル.ts
typescriptで書くと構造がマッチしていないと怒られるので`typescript/define/javascript.ts`を参考に。
* version:バージョン(未使用)
* lang:プログラム言語にヒットするための正規表現
* defAsCode:定義リスト
	+ class:表示用cssクラス
	+ regex:マーク条件
	+ str?:変換用文字列の定義(default:\`$1\`)
	+ fnc?:変換時に関数を使用
* defNoCode:コメント・文字列定義リスト
	+ class:表示用cssクラス
	+ regex:マーク条件
	+ str?:変換用文字列の定義(default:\`$1\`)
	+ fnc?:変換時に関数を使用
	+ index?:処理に使うため、定義しても無視されます
	+ escape?:エスケープキャラクタのつもりだがregexで事足りそうなので未使用


## bugs
* 文字列の中にコメントがあるとコメントとして扱われる -> Fixed 2015.11.10