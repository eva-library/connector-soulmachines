### Generating a Self-Signed SSL Key and Cert

#### Linux or Mac
1. Run the following script:
- `mkdir certs`
- `cd certs`
- `../scripts/generate-ssl.sh localhost`

#### Windows

Install `OpenSSL`, [follow these instructions](https://www.xolphin.com/support/OpenSSL/OpenSSL_-_Installation_under_Windows).

Run the following commands in your command line.
```
mkdir certs
cd certs
OpenSSL.exe req -new -nodes -subj /C=NZ/commonName=localhost -keyout localhost.key -out localhost.csr
OpenSSL.exe x509 -req -days 3650 -in localhost.csr -signkey localhost.key -out localhost.crt
cd ..
```
**NOTE** You can replace `localhost` with another name if you choose, however you must update the relative paths in the .env file.