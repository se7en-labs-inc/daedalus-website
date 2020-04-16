---
title: Windows checksum verification instructions
---
### Installer integrity
      
SHA256 checksum can be verified using the following command:

```
certutil -hashfile C:\Users\YOUR_USERNAME\Downloads\{{ filename }} SHA256
```

Instead of typing the path to the Daedalus installer executable use drag and drop:

  - Press Windows Start Menu
  
  - Type cmd
  
  - You should see cmd.exe in the list of results. Click on cmd.exe to launch it.
  
  - Type or paste: certutil -hashfile
  
  - Press space
  
  - Drag and drop Daedalus installer from Finder to Terminal
  
  - Press space
  
  - Type or paste: SHA256
  
  - Press enter key
  
You should see the following output, where string on the second line is the SHA256 checksum:

`SHA256 hash of file C:\Users\YOUR_USERNAME\Downloads\{{ filename }}:`

`{{ checksum }}`

`CertUtil: -hashfile command completed successfully.`
