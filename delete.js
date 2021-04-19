const path = require('path');
const fs = require('fs');
const readline = require('readline');

// You need to execute like this: node delete C:\Users\Diana Villalvazo\Desktop\Repositorios\KS-NG\directories-node\test
let directoryPath = process.cwd();
if(process.argv[2] != undefined){
    const [ , , ...args ] = process.argv;
    // Fixing if the dir has a space
    directoryPath = args.join(" ").toString();
}

let nfiles = 0;
let ndirectories = 0;

function readDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            let route = path.join(dirPath, file);
            if (fs.statSync(route).isDirectory()) {
                ndirectories++;
                readDirectory(route);
            }  
            else {
                nfiles++;
            }                        
        });

    });
}

try{
    if(fs.existsSync(directoryPath)){
        
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            if(files.length === 0){
                //Delete the route directory if its empty
                    fs.rmdirSync(directoryPath);
                    ndirectories++;
                    console.log(`Done. ${nfiles} files and ${ndirectories} directories removed.`);
            }
            else{
                ask();
            }
        });

        function ask(){

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Are you sure you want to remove all the content? [yes]/no ', (answer) => {
                if(answer.toLowerCase() === 'yes'){
                    // count the files inside
                    readDirectory(directoryPath);
                    ndirectories++;
                    setTimeout(function(){                     
                        //Delete the route directory   
                        fs.rmdirSync(directoryPath, { recursive: true });
                        console.log(`Done. ${nfiles} files and ${ndirectories} directories removed.`);
                    }, 3000)
                }
                else{
                    console.log('Nothing was removed.')
                }          
                rl.close();
            }); 
        }
    }
    else{
        throw new Error ("Directory not exists") 
    }

}
catch(err) {
    console.log(err.message);
}