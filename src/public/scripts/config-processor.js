const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Create a dist/processed folder for processed files
const inputScript = path.join(__dirname, 'trends.js');
const outputScript = path.join(__dirname, 'dist', 'trends.js'); // New output path

var replacements = {
    '{{TRENDS_API_URL}}': process.env.TRENDS_API_URL
};

exports.replaceConfigs = async function replaceConfigs() {
    try {
        // Read from source file
        let content = await fs.readFile(inputScript, 'utf8');
        
        // Apply all replacements
        Object.entries(replacements).forEach(([placeholder, value]) => {
            content = content.replace(placeholder, value);
        });
        
        // Ensure dist directory exists
        await fs.mkdir(path.dirname(outputScript), { recursive: true });
        
        // Write to dist file
        await fs.writeFile(outputScript, content);
        console.log(`Successfully processed ${outputScript}`);
    } catch (error) {
        console.error(`Error processing script file:`, error);
        throw error;
    }
}