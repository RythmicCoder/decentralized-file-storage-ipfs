// ===== IMPORTS =====
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// ===== APP SETUP =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== SERVE FRONTEND =====
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ===== MULTER SETUP =====
const upload = multer({ dest: "uploads/" });

// ===== PINATA UPLOAD FUNCTION =====
async function uploadToIPFS(filePath) {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    const res = await axios.post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
            ...data.getHeaders(),
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
        }
    });

    return res.data.IpfsHash;
}

// ===== STORE FILE (UPLOAD) =====
let storedCIDs = [];

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;

        console.log("Uploading to IPFS...");
        const cid = await uploadToIPFS(filePath);

        console.log("Uploaded CID:", cid);

        // 👉 (Optional) Blockchain storage call here if you want

        storedCIDs.push(cid);

        res.json({ cid });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
});

// ===== GET STORED FILES =====
app.get("/files", (req, res) => {
    res.json(storedCIDs);
});

// ===== START SERVER =====
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});