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

After this, the project will be running on your localhost.

## Explaination of code
### App.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PhoneNumber from './artifacts/contracts/PhoneNumber.sol/PhoneNumber.json';

// WARNING: This is a dummy contract address generated on a local network after deploying our code.
// Ideally, the address must not be used outside of this testing environment on a local network.
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      console.log('Connected', accounts[0]);
      fetchPhoneNumber();
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchPhoneNumber = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, PhoneNumber.abi, provider);
    
    const data = await contract.getPhoneNumber();
    setPhoneNumber(data);
    console.log(data);
  };
  
  const updatePhoneNumber = async () => {
    if (!phoneNumber) return;
    
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, PhoneNumber.abi, signer);
      
      const transaction = await contract.setPhoneNumber(phoneNumber);
      await transaction.wait();
    }
  };
  
  useEffect(() => {
    connectWallet();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchPhoneNumber}>Fetch Phone Number</button>
        <button onClick={updatePhoneNumber}>Update Phone Number</button>
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          value={phoneNumber}
        />
      </header>
      <div>{phoneNumber}</div>
    </div>
  );
}
## Line to line explaination
### Code
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PhoneNumber from './artifacts/contracts/PhoneNumber.sol/PhoneNumber.json';

/*The code begins with importing necessary dependencies. React, useEffect, and useState are imported from the 'react' package.
The ethers library is imported from the 'ethers' package. It provides a collection of libraries and tools for interacting with Ethereum.
The PhoneNumber contract artifact is imported from a local file. It contains the contract's ABI (Application Binary Interface) and other necessary information for interacting with the contract.*/


### Code
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

/* A contract address is declared as a constant. This address is a dummy contract address generated on a local network after deploying the contract. It is used for testing purposes.*/


### Code
export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  
/*The main component App is defined as a default export. It is a functional component written in JSX.
The component uses the useState hook to define a state variable phoneNumber and its corresponding setter function setPhoneNumber. The initial value of phoneNumber is set to an empty string.*/


### Code
const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log('Connected', accounts[0]);
    fetchPhoneNumber();
  } catch (error) {
    console.log(error);
  }
};

/*The connectWallet function is defined. It is an asynchronous function triggered when a user clicks a button to connect their wallet.
Inside the function, it first checks if the window.ethereum object is available. If not, it displays an alert asking the user to install MetaMask, which is a popular Ethereum wallet.
If window.ethereum is available, it sends a request to the wallet to prompt the user for account access. The user can select an account to connect.
The selected account is logged to the console, and then the fetchPhoneNumber function is called to retrieve the phone number associated with the account.*/


### Code
const fetchPhoneNumber = async () => {
  if (!window.ethereum) {
    alert('Please install MetaMask!');
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, PhoneNumber.abi, provider);

  const data = await contract.getPhoneNumber();
  setPhoneNumber(data);
  console.log(data);
};

/*The fetchPhoneNumber function is defined. It is an asynchronous function used to retrieve the phone number associated with the connected account.
Similar to connectWallet, it checks if window.ethereum is available and displays an alert if it's not.
It creates a new instance of ethers.providers.Web3Provider using window.ethereum as the provider.
It then creates a new instance of the ethers.Contract class using the contract address (contractAddress), the contract's ABI (PhoneNumber.abi), and the provider.
The getPhoneNumber method of the contract is called, which returns the phone number associated with the connected account.
The returned data is set as the value of the phoneNumber state variable using setPhoneNumber, and it is also logged to the console.*/

### Code
const updatePhoneNumber = async () => {
  if (!phoneNumber) return;

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, PhoneNumber.abi, signer);

    const transaction = await contract.setPhoneNumber(phoneNumber);
    await transaction.wait();
  }
};

/*The updatePhoneNumber function is defined. It is an asynchronous function triggered when a user clicks a button to update their phone number.
It first checks if phoneNumber is empty and returns if it is.
It then checks if window.ethereum is defined (meaning MetaMask or another Ethereum wallet is available).
It creates a new instance of ethers.providers.Web3Provider using window.ethereum as the provider.
It gets the signer from the provider. The signer is responsible for signing and sending transactions on behalf of the connected account.
It creates a new instance of the ethers.Contract class using the contract address (contractAddress), the contract's ABI (PhoneNumber.abi), and the signer.
The setPhoneNumber method of the contract is called, passing the phoneNumber as an argument. This updates the phone number associated with the connected account.
The resulting transaction is stored in the transaction variable, and await transaction.wait() waits for the transaction to be mined and confirmed on the blockchain.*/

### Code
useEffect(() => {
  connectWallet();
}, []);

/*The useEffect hook is used to execute the connectWallet function when the component mounts.
An empty dependency array [] is passed as the second argument, which ensures that connectWallet is only called once when the component is initially rendered.*/

### Code
return (
  <div className="App">
    <header className="App-header">
      <button onClick={fetchPhoneNumber}>Fetch Phone Number</button>
      <button onClick={updatePhoneNumber}>Update Phone Number</button>
      <input
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        value={phoneNumber}
      />
    </header>
    <div>{phoneNumber}</div>
  </div>
);

/*The return statement renders the JSX markup for the component.
The component is wrapped in a <div> element with the class name "App".
Inside the <div>, there is a header with the class name "App-header".
Two buttons are rendered: "Fetch Phone Number" and "Update Phone Number". Clicking these buttons triggers the corresponding functions (fetchPhoneNumber and updatePhoneNumber).
An <input> element is rendered for entering the phone number. Its onChange event updates the phoneNumber state with the entered value.
The current phoneNumber state value is displayed inside a <div> element.*/





## For better understanding, Loom Link is present here!
https://www.loom.com/share/711bad45f5d940d9ac3b228c7ee6cff2

