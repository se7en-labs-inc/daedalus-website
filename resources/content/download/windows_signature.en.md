---
title: Windows PGP signature verification instructions
---

### Windows

1. Obtain both the Daedalus installer .exe file, and its corresponding .exe.asc
   signature file -- put them in the same directory.
1. Obtain the GNUPG package from
   [https://www.gpg4win.org/](https://www.gpg4win.org/)
1. Proceed with installation and launch the Kleopatra component.
1. Unless you already have a personal GPG key, you will have to create one
   (which is required for step 6):

   - Select the menu item File -&gt; New keypair -&gt; Create a personal OpenPGP
     key pair.
   - Enter a name and an email address that suit you personally.
   - Choose a passphrase to protect your personal key (NOTE: the passphrase can
     be empty, but it is not recommended if you intend to use GNUPG in future).

1. Import the IOHK key:

   - File -&gt; Lookup on Server
   - Allow network access to 'dirmngr', if the prompt arises
   - Search for signing.authority@iohk.io
   - If you cannot find the key, please make sure hkp://keyserver.ubuntu.com/
     (or any other maintained PGP key server of your choice) is used as
     Kleopatra's default key server.
   - Import the key
   - Do not certify the key just yet
   - Right-click on the key, and choose "Details"
   - Ensure that the fingerprint is 31B3F22FA0CCE2E8382C04A2807F2ACD0171BC90
   - If it's not, the wrong key was imported, right click and delete
   - If it is, we are good to go

1. Certify the IOHK key (this designates trust and is required for the next
   step):

   - Once you have a personal GPG key, right-click on the imported IOHK key and
     choose Certify
   - Enable the IOHK user ID
   - Tick the I have verified the fingerprint checkbox (since you did, as per
     step 5), and proceed.
   - You should receive a message saying Certification successful

1. Verify the installer binary:

   - Click the Decrypt/Verify button on the Kleopatra toolbar
   - Choose the Daedalus installer .exe file in the file dialog (the .asc
     signature file must reside in the same directory)

1. If the verification is successful, you will receive a green-tinted message
   box saying:
   - Valid signature by signing.authority@iohk.io
   - Date of signature
   - With certificate 31B3 F22F A0CC E2E8 382C 04A2 807F 2ACD 0171 BC90
   - Anything else would constitute a signature verification failure.
