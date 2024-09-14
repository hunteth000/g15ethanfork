import { URL } from 'url';
import { analyzeNpm } from './api_handler/npm_handler/analyzer_npm.js';
import { analyzeGraphQL } from './api_handler/graphql_handler/analyzer_graphql.js';
//import { indexValidation } from './validation.js'
import * as readline from 'readline';

// Function to validate if the input is a valid URL
export function isValidUrl(input: string): boolean {
    try {
        new URL(input);  // If URL constructor doesn't throw, it's valid
        return true;
    } catch (err) {
        return false;
    }
}

// Logger function to output analysis results
function logger(message: string) {
    console.log(`[LOG]: ${message}`);
}

// Main function to handle URL input from command line
function main() {
    // Create an interface for input and output streams
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prompt user for URL input
    rl.question('Please enter a URL: ', (urlInput) => {
        console.log('URL input:', urlInput);

        if (!urlInput) {
            console.error('Error: No URL provided.');
            rl.close();  // Close the readline interface
            return;
        }

        // Validate the URL
        if (isValidUrl(urlInput)) {
            console.log(`The URL you provided is valid: ${urlInput}`);
        } else {
            console.error('Error: Invalid URL format.');
            rl.close();  // Close the readline interface
            return;
        }

        console.log('URL validation successful.');

        console.log("Starting analysis...");

        // This if else statement checks if the link is a github link or a npm link, then calls the appropriate analyze functions.  Then it outputs the result.
        if(urlInput.includes("github.com")){
            console.log("This is a GitHub link.");
            const graphqlResult = analyzeGraphQL();
            console.log(graphqlResult);
        }
        else if (urlInput.includes("npmjs.com/package")) {
            console.log("This is an npm link.");
            const npmResult = analyzeNpm();
            console.log(npmResult);
        }
        else {
            console.log("This is neither a GitHub nor an npm link.");
        }

        

        console.log("All analyses complete.");


        //indexValidation();

        rl.close();  // Close the readline interface
    });
}

// Run the main function
main();
