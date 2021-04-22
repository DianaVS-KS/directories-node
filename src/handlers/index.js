const fs = require('fs');
const os = require('os');

const home = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    const html =  fs.readFileSync('./src/public/index.html', 'utf-8');
    res.write(html);
    res.end();
}

const books = (req, res) => {
    if(req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const txt = fs.readFileSync('./src/public/books.txt', 'utf-8');  
        res.write(txt);
    }
    if(req.method === 'POST'){
        let addBook = '';
        req.on('data', newData => {
            addBook += newData;            
        })
        req.on('end', () => {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            fs.writeFile('./src/public/books.txt', `${addBook},\n`, {flag: 'a', encoding: 'utf-8'}, (err) => {
                if (err) return console.log(err);
                console.log('Book added');
            });
        });
        res.write('You added a new book! :D');
    }
    if(req.method === 'DELETE'){
        res.writeHead(202, { 'Content-Type': 'text/plain'});
        fs.writeFileSync('./src/public/books.txt','');
        res.write('It is all gone D:');
        console.log('Book deleted');
    }
    res.end();
}

// To display content need to pass a query parameter like this: http://localhost:3000/file-viewer?file=file1
const viewer = (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        const url = new URL(`http://${req.headers.host}${req.url}`);
        const params = url.searchParams.get('file');
        const searchedFile = fs.readFileSync(`./src/public/fileDirectory/${params}.txt`, 'utf-8');
        res.write(searchedFile);
        res.end();
    }
    catch(error){
        notFound(req, res);
    }
}

const serverStatus = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    let servStat = {
        hostname: os.hostname(),
        cpusAvailable: os.cpus(),
        architecture: os.arch(),
        uptime: os.uptime(),
        userInfo: os.userInfo(),
        memoryAvailable: os.freemem(),
    }
    servStat = JSON.stringify(servStat);
    res.write(servStat);
    res.end();
}

const notFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html'});
    const html =  fs.readFileSync('./src/public/404.html', 'utf-8');
    res.write(html);
    res.end();
}

module.exports = {
    home,
    books,
    viewer,
    serverStatus,
    notFound,
}