# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Compile
```
npx hardhat compile
```
The above command will create `artifacts` folder under `src`

## Start local network
```
npx hardhat node
```
The above command will start local HTTP and WebSocket JSON-RPC server which also created 20 test accounts with known publicly-known private keys.

## Deploy our contracts (*.sol) against local network
```
npx hardhat run scripts/deploy.js --network localhost
```
The above command will deploy our contracts against local ethereum network started with ```node``` command

## Install and connect Metamask on browser
Follow Metamask's instructions and show all network.  Choose local network, e.g. Localhost 8545.  Next click the avatar on Metamask and choose "Import Account".  Copy one of the private keys generated during the start of local network.

## Start React app
```
npm start
```
Note Metamask should correctly recognize the dummy wallet connected to the testing address.  Open developer console to observe the result and greeting message.