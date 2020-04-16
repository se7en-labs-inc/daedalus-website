---
title: Windows PGP signature verification instructions
---
### 署名検証の手順 – WINDOWS

- ダイダロス インストーラ .exe ファイルとそれに対応する.exe.asc 署名ファイルの両方を入手して同じディレクトリに入れます。
      
- [https://www.gpg4win.org/](https://www.gpg4win.org/) から GNUPG パッケージを入手します

- インストールを進め、Kleopatra コンポーネントを立ち上げます。

- 個人 GPG 鍵を既にお持ちでなければ、作成する必要があります (これはステップ6で必要です)： a. メニュー項目で、File -> New keypair -> Create a personal OpenPGP key pairを選択します b. あなたに合った名前とEメールアドレスを入力します。 c. ご自分の個人鍵を保護するためのパスフレーズを選びます (ご注意： パスフレーズは空白にしておくこともできますが、GNUPG を今後使用する可能性がある場合はお勧めしません）。

- IOHK 鍵をインポートします：

  - File -&gt; Lookup on Server
  
  - プロンプトが表示された場合は、'dirmngr'へのネットワークアクセスを許可します
  
  - signing.authority@iohk.io を検索します 
  
  - 鍵をインポートします
  
  - 鍵の認証はまだしないでください
  
  - 鍵を右クリックして、"Details"を選択します
  
  - 指紋が D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA であることを確認します
  
  - 違う場合、誤った鍵がインポートされていますので、右クリックして削除します
  
  - 正しい場合は続行できます

- CIOHK 鍵を証明する (これは信頼性を認証する、次のステップに必要な作業です)： a. 個人GPG 鍵を入手したら、インポートしたIOHK 鍵を右クリックして、Certify を選択します b. IOHK ユーザID を有効にします c. I have verified the fingerprint checkbox （ステップ5で実行済です）にチェックを入れ、続行します。 d. Certification successfulというメッセージを受け取るはずです

- インストーラのバイナリを検証： a. Kleopatra ツールバーにあるDecrypt/Verifyボタンをクリックします b. ファイルダイアログからダイダロス インストーラ .exe ファイルを選択します (同じディレクトリに .asc 署名ファイルがあるはずです) c. 検証に成功したら、以下が記述された緑色のメッセージボックスを受け取ります： - Signing.authority@iohk.io による有効な署名 - 署名の日付 - 添付の証明書 D325 87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA
  
- これ以外の表示は署名検証に失敗したことを意味します。
