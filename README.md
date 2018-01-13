
# Hashcrypt

https://github.com/roobie/hashcrypt

Non-storing solution for managing all your passwords via a master password.

Hashcrypt uses the hash algorithm known as SHA-512 with your master password and the site's ID (FQDN/domain) as parameters to compute the the password for a site

Hashcrypt does not send your passwords anywhere else but to the current tab, if there are inputs that accept passwords. Hashcrypt does not do any sort of remote requests nor does it store your passwords or any other data, for that matter.

## Packaging

`npm run package`