const path = require('path');
const fs = require('fs');

// You need to pass an argument like this: node search C:/Users/Diana Villalvazo/Desktop/Repositorios/KS-NG
let directoryPath = process.cwd();
if(process.argv[2] != undefined){
    const [ , , ...args ] = process.argv;
    // Fixing if the dir has a space
    directoryPath = args.join(" ").toString();
}

try{
    if(fs.existsSync(directoryPath)){
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            let route = path.join(directoryPath, file);
            //Checking if its a directory
            if(fs.statSync(route).isDirectory()){
                console.log(file + "/"); 
            }
            else{
                console.log('file: ' + file); 
            }
        });
    })
}
else{
    throw new Error ("Directory not exists") 
}
}
catch(err) {
    console.log(err.message);
}

