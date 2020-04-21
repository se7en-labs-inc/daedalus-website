---
title: Windows checksum verification instructions
---
### Installer integrity
      
SHA256 checksum can be verified using the following command:

```
certutil -hashfile C:\Users\YOUR_USERNAME\Downloads\{{ filename }} SHA256
```

Instead of typing the path to the Daedalus installer executable use drag and drop:

  1. Press Windows Start Menu
  
  1. Type cmd
  
  1. You should see cmd.exe in the list of results. Click on cmd.exe to launch it.
  
  1. Type or paste: certutil -hashfile
  
  1. Press space
  
  1. Drag and drop Daedalus installer from Explorer to Command Prompt
  
  1. Press space
  
  1. Type or paste: SHA256
  
  1. Press enter key
  
You should see the following output, where string on the second line is the SHA256 checksum:

`SHA256 hash of file C:\Users\YOUR_USERNAME\Downloads\{{ filename }}:`

`{{ checksum }}`

`CertUtil: -hashfile command completed successfully.`
