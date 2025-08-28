---
title: Linux PGP signature verification instructions
---

- Obtain both the Daedalus installer .bin file, and its corresponding .bin.asc
  signature file -- put them in the same directory.

- Ensure that the gpg2 command is available (assuming Ubuntu Linux) in your
  shell, and if not -- execute the following shell command (shell commands
  further indicated by this bold monospace font):

  - <code>apt-get install gnupg2</code>

- Unless you already have a personal GPG key, create one (this is required for
  step 5):

  - <code>gpg2 --generate-key</code>
  - Supply an user ID (real name and email) that suit you personally
  - Choose a passphrase to protect your personal key (NOTE: the passphrase can
    be empty, but it is not recommended if you intend to use this key and GNUPG
    in future)

- Import the IOHK key:

  - <code>gpg2 --keyserver hkp://keyserver.ubuntu.com/ --search-keys
    signing.authority@iohk.io</code>
  - In the selection dialogue, choose the key with fingerprint 807F2ACD0171BC90

- Sign the IOHK key (this designates trust and is required for the next step):

  - <code>gpg2 --lsign 31B3F22FA0CCE2E8382C04A2807F2ACD0171BC90</code>

- Verify the installer binary using the .asc signature (the .asc signature file
  must reside in the same directory as the installer binary):
  - <code>gpg2 --verify {{ filename }}.asc</code>
  - Successful verification should produce a message like follows:

<code>
gpg: assuming signed data in {{ filename }}.pkg
gpg: Signature made ...DATE...
gpg: using RSA key CD1F21F62477EB42D7C4F3DEB3AD9541F4DBD0FE
gpg: checking the trustdb
gpg: marginals needed: 3 completes needed: 1 trust model: pgp
gpg: depth: 0 valid: 1 signed: 1 trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: depth: 1 valid: 1 signed: 0 trust: 1-, 0q, 0n, 0m, 0f, 0u
gpg: next trustdb check due at ...DATE...
gpg: Good signature from IOHK Signing Authority <signing.authority@iohk.io>
</code>
