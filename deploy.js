const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const PhoneNumber = await ethers.getContractFactory("PhoneNumber");
  const phoneNumber = await PhoneNumber.deploy("1234567890"); // Set the initial phone number here

  console.log("PhoneNumber deployed to:", phoneNumber.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });