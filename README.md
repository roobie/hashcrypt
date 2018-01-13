
# Hashcrypt

Non-storing solution for managing all your passwords via a master password.

Hashcrypt uses the hash algorithm known as SHA-512 with your master password and the site's ID (FQDN/domain) as parameters to compute the the password for a site

No data handled by Hashcrypt leaves the browser in any way, so neither your master password nor your actual password are stored anywhere.

## Packaging

`npm run package`