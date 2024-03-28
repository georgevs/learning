# Java security features

[Tutorial](https://docs.oracle.com/javase/tutorial/security/index.html)
[Policy file syntax](https://docs.oracle.com/javase/8/docs/technotes/guides/security/PolicyFiles.html#FileSyntax)

## Java home, default policy file, and keystore file
```
/usr/lib/jvm/java-17-openjdk-amd64/bin/java
ls -la /usr/lib/jvm/java-17-openjdk-amd64/lib/security/default.policy
keytool -list -keystore /usr/lib/jvm/java-17-openjdk-amd64/lib/security/cacerts
```

## Build
```
javac -d ./bin ./app/Count.java
```

## Package
```
pushd ./bin; jar cvf count.jar . ; popd
```

## Run (no securty)
```
java -cp ./bin Count ./data/data.txt
java -cp ./bin/count.jar Count ./data/data.txt
```

## Generate self-signed certificate
WARNING: Let's encrypt certificates DO NOT allow code signing.
```
mkdir -p ./secret
rm -rf ./secret/.keystore
keytool -genkeypair -keyalg RSA -alias signFiles -keysize 2048 -validity 90 -keystore ./secret/.keystore
keytool -list -keystore ./secret/.keystore
```

## Import live certificate
```
openssl enc -aes-128-cbc -pbkdf2 -salt -d -in ~/ws-archive/certs.tar.gz.enc | tar xzv --directory ./
openssl pkcs12 -export -inkey ./certs/privkey.pem -in ./certs/fullchain.pem -out ./certs/cert.pfx -name spamfro
keytool -importkeystore -srckeystore ./certs/cert.pfx -srcstoretype PKCS12 -srcalias spamfro -destkeystore ./secret/.keystore -deststoretype JKS -destalias spamfro
```

## Sign the app jar, and export the (public key) certificate 
```
rm -rf ./bin/count-signed.jar
jarsigner -keystore ./secret/.keystore -signedjar ./bin/count-signed.jar ./bin/count.jar signFiles
jarsigner -keystore ./secret/.keystore -verify -verbose -certs ./bin/count-signed.jar

rm -rf ./bin/spamfro.cer
keytool -export -keystore ./secret/.keystore -alias signFiles -file ./bin/spamfro.cer
```

## Deploy
```
rm -rf ./deploy
mkdir -p ./deploy
cp ./bin/count-signed.jar ./deploy/count.jar
cp ./bin/spamfro.cer ./deploy/spamfro.cer
```

## Import the provider certificate
```

mkdir -p ./local
rm -rf ./local/.keystore
keytool -importcert -alias spamfro -file ./deploy/spamfro.cer -keystore ./local/.keystore
keytool -list -keystore ./local/.keystore
```

## Run deployed jar
```
java -cp ./deploy/count.jar Count ./data/data.txt
java -Djava.security.manager -cp ./deploy/count.jar Count ./data/data.txt
java -Djava.security.manager -Djavax.net.ssl.trustStore=./local/.keystore -Djava.security.policy=./local/.java.policy -cp ./deploy/count.jar Count ./data/data.txt
```
