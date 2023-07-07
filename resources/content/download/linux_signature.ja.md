---
title: Linux PGP署名検証手順
---

<ol>
  <li>
    Daedalusインストーラの.binファイルとそれに対応する.bin.ascシグネチャファイルの両方を入手し、同じディレクトリに置きます。
  </li>
  <li>
    gpg2コマンドが（Ubuntu Linuxを想定して）シェルで利用可能であることを確認し、そうでなければ - 次のシェルコマンド（この太字の等幅フォントでさらに示されるシェルコマンド）を実行します。
    <ul>
      <li>
        <code>
          apt-get install gnupg2
        </code>
      </li>
    </ul>
  </li>
  <li>
    パーソナルGPGキーをすでに持っていない限り、それを作成します（これはステップ5に必要です）。
    <ul>
      <li>
        <code>
          gpg2 --generate-key
        </code>
      </li>
      <li>
        自分に合ったユーザーID（本名とEメール）を入力してください
      </li>
      <li>
        あなたの個人鍵を保護するためにパスフレーズを選択してください（注：パスフレーズは空でも構いませんが、将来この鍵とGNUPGを使うつもりならばお勧めできません）
      </li>
    </ul>
  </li>
  <li>
    IOHKキーをインポートします。
    <ul>
      <li>
        <code>
          gpg2 --keyserver hkp://keyserver.ubuntu.com/ --search-keys  signing.authority@iohk.io
        </code>
      </li>
      <li>
        選択ダイアログで、指紋の付いた鍵を選択してくださいF99D6C70C2B3FB43
      </li>
    </ul>
  </li>
  <li>
    IOHKキーに署名します（これは信頼を指定し、次のステップに必要です）。
    <ul>
      <li>
        <code>
          gpg2 --lsign 53D0FA8DA2B8D1FF4975AECBF99D6C70C2B3FB43
        </code>
      </li>
    </ul>
  </li>
  <li>
    .asc署名を使用してインストーラーバイナリを確認します（.asc署名ファイルはインストーラーバイナリと同じディレクトリに存在する必要があります）。
    <ul>
      <li>
        <code>
          gpg2 --verify daedalus-VERSION-cardano-sl-VERSION-mainnet-linux.bin.asc
        </code>
      </li>
      <li>
        検証が成功すると、次のようなメッセージが表示されます。
      </li>
    </ul>
  </li>
</ol>
<code>
gpg: assuming signed data in daedalus-VERSION-cardano-sl-VERSION-mainnet-linux.bin.pkggpg: Signature made ...DATE...gpg: using RSA key 1429962A8C47A3F924AED49FD7B2E172D11C4B3Cgpg: checking the trustdbgpg: marginals needed: 3 completes needed: 1 trust model: pgpgpg: depth: 0 valid: 1 signed: 1 trust: 0-, 0q, 0n, 0m, 0f, 1ugpg: depth: 1 valid: 1 signed: 0 trust: 1-, 0q, 0n, 0m, 0f, 0ugpg: next trustdb check due at ...DATE...gpg: Good signature from IOHK Signing Authority <signing.authority@iohk.io>
</code>
