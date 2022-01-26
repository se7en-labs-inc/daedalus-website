---
title: Windows PGP signature verification instructions
---

### 署名検証の手順 – WINDOWS

1. ダイダロス インストーラ .exe ファイルとそれに対応する.exe.asc 署名ファイルの
   両方を入手して同じディレクトリに入れます。
1. [https://www.gpg4win.org/](https://www.gpg4win.org/) から GNUPG パッケージを
   入手します

1. インストールを進め、Kleopatra コンポーネントを立ち上げます。

1. 個人 GPG 鍵を既にお持ちでなければ、作成する必要があります (これはステップ 6
   で必要です)： a. メニュー項目で、File -> New keypair -> Create a personal
   OpenPGP key pair を選択します b. あなたに合った名前と E メールアドレスを入力
   します。 c. ご自分の個人鍵を保護するためのパスフレーズを選びます (ご注意： パ
   スフレーズは空白にしておくこともできますが、GNUPG を今後使用する可能性がある
   場合はお勧めしません）。

1. IOHK 鍵をインポートします：

   - File -&gt; Lookup on Server
   - プロンプトが表示された場合は、'dirmngr'へのネットワークアクセスを許可します
   - signing.authority@iohk.io を検索します
   - 鍵が見つからない場合は、hkp://keyserver.ubuntu.com/（または使用している他の
     PGP 鍵サーバー）が Kleopatra のデフォルト鍵サーバーに指定されているか確認し
     てください。
   - 鍵をインポートします
   - 鍵の認証はまだしないでください
   - 鍵を右クリックして、"Details"を選択します
   - 指紋が D32587D4090FE461CAEE0FF4966E5CB9CBFAA9BA であることを確認します
   - 違う場合、誤った鍵がインポートされていますので、右クリックして削除します
   - 正しい場合は続行できます

1. CIOHK 鍵を証明する (これは信頼性を認証する、次のステップに必要な作業です)：
   a. 個人 GPG 鍵を入手したら、インポートした IOHK 鍵を右クリックして、Certify
   を選択します b. IOHK ユーザ ID を有効にします c. I have verified the
   fingerprint checkbox （ステップ 5 で実行済です）にチェックを入れ、続行します
   。 d. Certification successful というメッセージを受け取るはずです

1. インストーラのバイナリを検証： a. Kleopatra ツールバーにある Decrypt/Verify
   ボタンをクリックします b. ファイルダイアログからダイダロス インストーラ .exe
   ファイルを選択します (同じディレクトリに .asc 署名ファイルがあるはずです) c.
   検証に成功したら、以下が記述された緑色のメッセージボックスを受け取ります： -
   Signing.authority@iohk.io による有効な署名 - 署名の日付 - 添付の証明書 D325
   87D4 090F E461 CAEE 0FF4 966E 5CB9 CBFA A9BA

1. これ以外の表示は署名検証に失敗したことを意味します。
