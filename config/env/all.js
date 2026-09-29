const required = ["SESSION_SECRET", "CRYPTO_KEY"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}. See .env.example`);
}

const port = process.env.PORT || 4000;
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/nodegoat";
const cookieSecret = process.env.SESSION_SECRET;
const cryptoKey = process.env.CRYPTO_KEY;

module.exports = {
    port,
    db,
    cookieSecret,
    cryptoKey,
    cryptoAlgo: "aes256",
    hostName: "localhost",
    environmentalScripts: []
};