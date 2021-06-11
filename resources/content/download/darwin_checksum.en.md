---
title: MacOS checksum verification instructions
---

<p>
  SHA256 checksum can be verified using the following command:
</p>
<code>
  shasum -a 256 ~/Downloads/{{ filename }}
</code>
<p>
  Instead of typing the path to the Daedalus installer executable use drag and drop:
</p>
<ol>
  <li>
    Open Terminal
  </li>
  <li>
    Type or paste:
    <code>shasum -a 256</code>
  </li>
  <li>
    Press space key
  </li>
  <li>
    Drag and drop Daedalus installer from Finder to Terminal
  </li>
  <li>
    Press enter key
  </li>
</ol>
<p>
  You should see the following output, where string on the second line is the SHA256 checksum:
</p>
<code>
  {{ checksum }}~/Downloads/{{ filename }}
</code>
