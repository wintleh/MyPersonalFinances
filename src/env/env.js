
// Read environment variables from .env file in root directory
const env = require('dotenv');
env.config();

// Export all env vars
module.exports = process.env;