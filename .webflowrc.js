require('dotenv').config({ path: '.env' });

module.exports = {
    authToken: process.env.WEBFLOW_SITE_API_TOKEN,
    siteId: process.env.WEBFLOW_SITE_ID,
    dir: "./src/devlink", // Default directory
    extension: "tsx", // Use TSX
    components: "*" // Sync all
};
