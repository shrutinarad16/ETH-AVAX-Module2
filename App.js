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