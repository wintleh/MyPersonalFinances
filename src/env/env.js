
// Read environment variables from .env file in root directory
const env = require('dotenv');
env.config();

// Export all env vars
module.exports = {
    HOST: process.env.HOST,
    PORT: process.env.PORT
}