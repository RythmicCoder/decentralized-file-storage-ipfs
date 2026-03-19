#  Decentralized File Storage using IPFS

##  Overview
This project is a decentralized file storage system that allows users to upload and retrieve files using IPFS (InterPlanetary File System).

Instead of storing files on a central server, files are stored across a distributed network and accessed using a unique Content Identifier (CID).

---

##  Problem Statement
Traditional cloud storage systems like Google Drive or Dropbox are centralized:
- Single point of failure
- Data can be tampered
- Requires trust in third parties

This project solves these issues using decentralized storage.

---

##  Solution
We built a web-based system where:
- Users upload files through a UI
- Files are stored on IPFS via Pinata
- Each file gets a unique CID
- Files are retrieved using the CID

---

##  Tech Stack

###  Frontend
- HTML
- CSS
- JavaScript

###  Backend
- Node.js
- Express.js
- Multer (file handling)
- Axios (API requests)

###  Storage
- IPFS (via Pinata API)

###  Blockchain (Optional)
- Solidity Smart Contract (to store CID)

---

##  How It Works

1. User selects a file from the frontend  
2. File is sent to backend (`POST /upload`)  
3. Backend temporarily stores file  
4. Backend uploads file to IPFS via Pinata  
5. IPFS generates a CID  
6. CID is sent back to frontend  
7. User accesses file using CID  

---

##  What is IPFS?

IPFS (InterPlanetary File System) is a decentralized storage system where:
- Files are distributed across multiple nodes  
- Each file has a unique Content Identifier (CID)  
- Files are retrieved using CID instead of location  

---

##  Example


CID: QMvZzc4WK5fstGvFMjK4ENKF6F1qUia2EnJaAMprMpJpIK


Access file:

https://ipfs.io/ipfs/
<CID>


---

##  Project Structure


dfs-project/
│── index.html
│── server.js
│── index.js
│── contracts/
│── uploads/
│── package.json
│── .env (not included)


---

##  How to Run Locally

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/decentralized-file-storage-ipfs.git

cd decentralized-file-storage-ipfs


### 2. Install dependencies

npm install


### 3. Create `.env` file

PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret_key


### 4. Run the server

node server.js


### 5. Open in browser

http://localhost:3000


---

##  Features

- Upload files to IPFS  
- Generate unique CID for each file  
- Retrieve files using CID  
- Simple and clean UI  
- Decentralized storage  

---

##  Limitations

- Depends on IPFS gateways  
- Slight delay in file availability  
- Files cannot be easily deleted  
- Requires internet connection  

---

##  Future Enhancements

- Store CID on blockchain  
- Add authentication system  
- Encrypt files before upload  
- Support multiple file uploads  
- Add file preview in UI  

---

##  Conclusion

This project demonstrates how decentralized technologies like IPFS can replace traditional centralized storage systems by providing better security, transparency, and reliability.

---

##  Author
**Simran Kapoor**
