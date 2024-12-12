const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

var script = path.join(__dirname, 'trends.js');
var replacements = {
    '{{TRENDS_API_URL}}': process.env.TRENDS_API_URL
};

exports.replaceConfigs = async function replaceConfigs() {
    try {
        let content = await fs.readFile(script, 'utf8');
        
        // Apply all replacements
        Object.entries(replacements).forEach(([placeholder, value]) => {
            content = content.replace(placeholder, value);
        });
        
        await fs.writeFile(script, content);
        console.log(`Successfully processed ${script}`);
    } catch (error) {
        console.error(`Error processing script file ${script}:`, error);
        throw error;
    }
}