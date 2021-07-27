const  { writeFile } = require("fs");
const { config } = require("dotenv");
const { argv } = require('yargs');

config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

const environmentFileContent = `
    export const environment = {
        production: ${isProduction},
        apiURI: "${process.env.API_GNP_URI}",
    };
`;

writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
        console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
