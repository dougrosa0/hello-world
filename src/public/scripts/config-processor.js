const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Create a dist/processed folder for processed files
const inputFiles = {
    'trends.js': path.join(__dirname, 'trends.js'),
    'notes.js': path.join(__dirname, 'notes.js')
};

const outputFiles = Object.entries(inputFiles).reduce((acc, [filename, inputPath]) => {
    acc[filename] = path.join(__dirname, 'dist', filename);
    return acc;
}, {});

var replacements = {
    '{{TRENDS_API_URL}}': process.env.TRENDS_API_URL,
    '{{NOTES_API_URL}}': process.env.NOTES_API_URL
};

exports.replaceConfigs = async function replaceConfigs() {
    try {
        // Process each file
        for (const [filename, inputPath] of Object.entries(inputFiles)) {
            // Read from source file
            let content = await fs.readFile(inputPath, 'utf8');
            
            // Apply all replacements
            Object.entries(replacements).forEach(([placeholder, value]) => {
                content = content.replace(placeholder, value);
            });
            
            // Ensure dist directory exists
            await fs.mkdir(path.dirname(outputFiles[filename]), { recursive: true });
            
            // Write to dist file
            await fs.writeFile(outputFiles[filename], content);
            console.log(`Successfully processed configurations for ${outputFiles[filename]}`);
        }
    } catch (error) {
        console.error(`Error processing script files:`, error);
        throw error;
    }
}