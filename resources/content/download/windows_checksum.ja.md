---
title: Windows checksum verification instructions
---
### Installer integrity

以下のコマンドを使ってSHA256チェックサムを検証できます：

```
certutil -hashfile C:\Users\YOUR_USERNAME\Downloads\{{ filename }} SHA256
```

Daedalusインストーラーにパスを入力する代わりにドラッグ＆ドロップを使って操作することができます

  1. Windowsの検索ボックスを開きます（スタートボタンまたは検索アイコンをクリック cmdと入力します

  1. 検索結果にcmd.exeが表示されますcmd.exeをクリックして起動します

  1. 次をを入力または貼り付けます：certutil -hashfile

  1. スペースキーを押します

  1. ファインダーからターミナルへDaedalusインストーラーをドラッグ＆ドロップします

  1. スペースキーを押します

  1. 次を入力または貼り付けます：SHA256

  1. エンターキーを押します
  
以下が出力されます。2番目の文字列がSHA256チェックサムです

`SHA256 hash of file C:\Users\YOUR_USERNAME\Downloads\{{ filename }}:`

`{{ checksum }}`

`CertUtil: -hashfile command completed successfully.`
