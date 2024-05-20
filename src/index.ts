// Import the 'replace-in-files' module
import replaceInFiles from "replace-in-files";
import { settings } from './settings';

/**
 * convert function that replaces old import names with new ones
 * @comment
 */

async function convert () {

    // Create an array of import names to be replaced
    const importNames = settings.importsToFix

    const newImportPath = settings.newImportPath;

    // Loop through each import name in the array
    for (let importName of importNames) {
        // Replace the old import with the new import using 'replaceInFiles'
        const { paths } = await replaceInFiles({
            // Specify the file paths where the import will be replaced
            files: settings.projectFilesPathGlob,
            // Specify the regular expression pattern to match the old import
            from: new RegExp(`import {\\s*${importName}\\s*} from ".*?"`, "g"),
            // Specify the new import to replace the old one
            to: `import {${importName}} from "${newImportPath}"`,
            // Do not save the old files after replacement
            saveOldFile: false,
            // Replace all matched files
            onlyFindPathsWithoutReplace: false
        });
    }
}

// Call the 'convert' function using an immediately invoked async function
(async () => {
	await convert();
})();
