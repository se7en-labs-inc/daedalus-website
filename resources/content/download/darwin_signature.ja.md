---
title: MacOS PGP署名検証手順
---
<ol>
	<li>
		Daedalusス インストーラ .pkg ファイルとそれに対応する.pkg.asc 署名ファイルの両方を入手して同じディレクトリに入れます。
	</li>
	<li>
		すでにGPG Suite をインストール済みで個人鍵を作成済みの場合はステップ５に進んでください。そうでない場合は次のステップを行ってください。
	</li>
	<li>
		<a href="https://gpgtools.org/" target="_blank" rel="noopener">Https://gpgtools.org</a>&nbsp;を開き、GPG Suite セクションに進んで、 .dmg ファイルをダウンロード、インストールします。
	<ul>
	<li>.dmg ファイルを右クリックして[開く (Open)] と、2つのアイコンがある新しいウィンドウが開きます：インストールとアンインストール</li>
	<li>インストール アイコンを右クリックして [&hellip;で開く (Open with..）] 、次に [インストーラ (Installer)] を選択すると、GPG Suite インストーラがスタートします</li>
	<li>インストールウィザードにしたがって操作してください</li>
	</ul>
	</li>
	<li>
		GPG Suite のインストールが終了したら、新しいペア鍵を作成するよう求められます (これはステップ6で必要になりますので、必ず行ってください)：
	<ul>
	<li>あなたに合った名前とEメールを入力します。</li>
	<li>ご自分の個人鍵を保護するためのパスフレーズを選びます (ご注意： パスフレーズは空白にしておくこともできますが、この鍵およびGPG Suite を今後使用する可能性がある場合はお勧めしません）。</li>
	</ul>
	</li>
	<li>
		GPG Keychain アプリケーションを使って IOHK鍵をインポートします：
	<ul>
	<li>アプリケーションメニューで、Select Key -&gt; Lookup Key on Key Server を選択します</li>
	<li>signing.authority@iohk.ioを検索します</li>
	<li>ユーザID &ldquo;IOHK Signing Authority &lt;signing.authority@iohk.io&gt;&rdquo; で指紋付き鍵 CBFAA9BA 選択し、[鍵を取得 (Retrieve Key)] をクリックします</li>
	<li>インポートした鍵の指紋が D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA であることを検証します (インポートした鍵を右クリックして、Detailsを選択)</li>
	<li>違う場合、誤った鍵がインポートされていますので、右クリックして削除します</li>
	<li>正しい場合、次のステップに進めます。</li>
	</ul>
	</li>
	<li>インポートしたIOHK鍵に署名する (これは信頼性を認証する、次のステップに必要な作業です)<br />・インポートしたIOHK鍵を右クリックし、&ldquo;Sign&rdquo;します。</li>
	<li>&nbsp;インストーラのバイナリを検証：
	<ul>
	<li>ファインダーから ダイダロスインストーラ (.pkg ファイル) を右クリックし (.asc ファイルを右クリックしないでください。これは無効です。)、 Services -&gt; OpenPGP:ファイルの署名を検証　を選択します(.asc 署名ファイルが同じディレクトリにあるはずです)</li>
	<li>[検証結果(Verification Results )] ダイアログが 赤色のカラム 結果の記述と共に表示されます：&nbsp;&nbsp;<br /><br />信頼できる署名<br />IOHK Signing Authority &lt;signing.authority@iohk.io&gt;<br />9F98 40B5 0AE5 39A2 732C F646 C131 557F 1471 941A<br />&nbsp; &nbsp; &nbsp;<br />これ以外の記述は、インストーラに対して有効な署名がされなかったことを意味します。</li>
	</ul>
	</li>
</ol>