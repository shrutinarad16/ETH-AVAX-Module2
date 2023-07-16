# Metacrafter 
# ETH+AVAX Module 2
## Short Summary of Project
This Project deals with hardhat environment. This environment connects Froentend to metamask.
We have connected metamask account to our frontend and performed some functions which upadte phone number and do transaction from our account and finally fetches the data.
In general,
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.
## Basic commands used in terminal

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

## Setup Procedure
1) Clone repository files from github to vs code
2) open multiple terminals
3) type, "npm i" in first terminal
4) type, "npx hardhat clean" in second terminal; because if prrevious files have generated them it will not compile our hardhat
5) type, "npx hardhat compile", in third terminal
6) type, "npx hardhat run --network localhost scripts/deploy.js" in first terminal
7) after deployment, our project is ready to run; so type, "npm start" in second terminal
8) finally, it is connected to local host named as  http://localhost:3000/

After this, the project will be running on your localhost. Typically at

## For better understanding, Loom Link is present here!
https://www.loom.com/share/711bad45f5d940d9ac3b228c7ee6cff2

