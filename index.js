require('dotenv').config();

const { ethers } = require("ethers");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// Connect to Ganache
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

// Your Ganache private key
const privateKey = "0x39bc9d604cbdb8dc83ee74960132715e518e8114a11e98273aef74f5d22f4b82";

// Create wallet
const wallet = new ethers.Wallet(privateKey, provider);

// Your deployed contract address
const contractAddress = "0xc1C0F1485b5897e1f591479732DaEC41f6e70A43";

// Contract ABI
const abi = [
    {
    "inputs": [
        {
        "internalType": "string",
        "name": "cid",
        "type": "string"
        }
    ],
    "name": "storeFile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "getFiles",
    "outputs": [
        {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    }
];

// Connect contract
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Upload to Pinata
async function uploadToIPFS(filePath) {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const fileName = filePath.split("/").pop(); // dynamic filename

    let data = new FormData();

    data.append("file", fs.createReadStream(filePath), {
    filename: fileName
    });

    const metadata = JSON.stringify({
    name: fileName
    });

    data.append("pinataMetadata", metadata);

    const res = await axios.post(url, data, {
    maxBodyLength: Infinity,
    headers: {
        ...data.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
    });

    const cid = res.data.IpfsHash;
    console.log("Uploaded to IPFS:", cid);

    return { cid, fileName };
}

// Main function
async function main() {
    try {
    const filePath = "./sample.txt";

    console.log("Uploading file to IPFS...");
    const { cid, fileName } = await uploadToIPFS(filePath);

    console.log("Storing CID on blockchain...");
    const tx = await contract.storeFile(cid);
    await tx.wait();

    console.log("Transaction mined");

    console.log("Fetching files...");
    const files = await contract.getFiles();

    console.log("Stored files:", files.map(f => f));

    // Generate working URL
    const fileURL = `https://gateway.pinata.cloud/ipfs/${cid}?filename=${fileName}`;

    console.log("\n🔗 Open this URL:");
    console.log(fileURL);

    } catch (error) {
    console.error("Error:", error.message);
    }
}

main();