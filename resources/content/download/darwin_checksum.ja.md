---
title: MacOSチェックサム検証手順
---
<p>
  SHA256チェックサムは、次のコマンドを使用して確認できます。
</p>
<code>
  shasum -a 256 ~/Downloads/{{ filename }}
</code>
<p>
  Daedalusインストーラ実行可能ファイルへのパスを入力する代わりに、ドラッグアンドドロップを使用します。
</p>
<ol>
  <li>
   オープンターミナル
  </li>
  <li>
    次のように入力するか貼り付けてください。
    <code>shasum -a 256</code>
  </li>
  <li>
    スペースキーを押す
  </li>
  <li>
    DaedalusインストーラをFinderからTerminalにドラッグアンドドロップします。
  </li>
  <li>
    Enterキーを押す
  </li>
</ol>
<p>
  次のような出力が表示されます。ここで、2行目の文字列はSHA256チェックサムです。
</p>
<code>
  {{ checksum }}~/Downloads/{{ filename }}
</code>
