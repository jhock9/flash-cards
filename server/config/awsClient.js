require("dotenv").config({ path: "../../.env" });
const { S3Client } = require("@aws-sdk/client-s3");
const logger = require("./winston");

// Set up your AWS configuration
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
logger.info('AWS S3 Client configured...');

// Export to photoUtils.js and photoSyncService.js
module.exports = s3;