---
title: MacOS PGP signature verification instructions
---

  <ol>
    <li>Obtain both the Daedalus installer .pkg file and its corresponding .pkg.asc signature file &ndash; put them in the same directory.</li>
    <li>If you already have the GPG Suite installed, and a personal key generated, please skip to step 5, and if not, proceed with the next step.</li>
    <li>Go to&nbsp;<a href="https://gpgtools.org/">https://gpgtools.org</a>, head to the GPG Suite section, download the .dmg file and install it:
      <ul>
      <li>Right-click the .dmg file, then Open, which will open a new window with two icons: Install and Uninstall</li>
      <li>Right-click the Install icon, and choose Open with.. -&gt; Installer, which should start the GPG Suite installer</li>
      <li>Follow through the installation wizard</li>
      </ul>
    </li>
    <li>Once GPG Suite installation completes, it will ask you to create a new key pair (this is required for step 6, so please don&rsquo;t skip it):
      <ul>
      <li>Enter a name and an email that suit you personally.</li>
      <li>Choose a passphrase to protect your personal key (NOTE: the passphrase can be empty, but it is not recommended if you intend to use this key and GPG Suite in future).</li>
      </ul>
    </li>
    <li>Import the IOHK key using the GPG Keychain application:
      <ul>
      <li>Select Key -&gt; Lookup Key on Key Server in the application menu</li>
      <li>Search for&nbsp;signing.authority@iohk.io</li>
      <li>Choose the key with fingerprint 0171BC90 with the user ID &ldquo;IOHK Signing Authority &lt;signing.authority@iohk.io&gt;&rdquo;, then click Retrieve Key</li>
      <li>
      <p>Verify (right-click the imported key, then Details) that the fingerprint of the imported key is 31B3 F22F A0CC E2E8 382C 04A2 807F 2ACD 0171 BC90</p>
      </li>
      <li>if it&rsquo;s not, the wrong key was imported, right-click and delete</li>
      <li>if it is, we are good to proceed with the next step.</li>
      </ul>
    </li>
    <li>Sign the imported IOHK key (this designates trust and is required for the next step):
      <ul>
      <li>Right-click on the imported IOHK key, then &ldquo;Sign&rdquo;.</li>
      </ul>
    </li>
    <li>Verify the installer binary:
      <ul>
      <li>Right-click the Daedalus installer (.pkg file) in Finder (do NOT right click on the .asc file, that will not work), then select Services -&gt; OpenPGP: Verify Signature of File (the .asc signature file must reside in the same directory)</li>
      <li>The Verification Results dialog will then appear with the verdict:<br /><br />Trusted signature<br />IOHK Signing Authority &lt;signing.authority@iohk.io&gt;<br />CD1F 21F6 2477 EB42 D7C4 F3DE B3AD 9541 F4DB D0FE<br /><br />Anything different means there was no valid signature for the installer.</li>
      </ul>
    </li>
  </ol>
