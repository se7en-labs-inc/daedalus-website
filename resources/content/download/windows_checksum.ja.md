---
title: Windows checksum verification instructions
---

### Installer integrity

以下のコマンドを使って SHA256 チェックサムを検証できます：

```
certutil -hashfile C:\Users\YOUR_USERNAME\Downloads\{{ filename }} SHA256
```

Daedalus インストーラーにパスを入力する代わりにドラッグ＆ドロップを使って操作す
ることができます

1. Windows の検索ボックスを開きます（スタートボタンまたは検索アイコンをクリック
   cmd と入力します

1. 検索結果に cmd.exe が表示されます cmd.exe をクリックして起動します

1. 次をを入力または貼り付けます：certutil -hashfile

1. スペースキーを押します

1. ファインダーからターミナルへ Daedalus インストーラーをドラッグ＆ドロップしま
   す

1. スペースキーを押します

1. 次を入力または貼り付けます：SHA256

1. エンターキーを押します

以下が出力されます。2 番目の文字列が SHA256 チェックサムです

`SHA256 hash of file C:\Users\YOUR_USERNAME\Downloads\{{ filename }}:`

`{{ checksum }}`

`CertUtil: -hashfile command completed successfully.`
