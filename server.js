const http = require('http');
const handler = require('./src/handlers')
const port = 3000;

const router = (path) => {
    const routes = {
        '/' : handler.home,
        '/books' : handler.books,
        '/file-viewer' : handler.viewer,
        '/server-status' : handler.serverStatus,
    };

    if(routes[path]){
        return routes[path];
    }
    return handler.notFound;
};

const server = http.createServer((req, res) => {
    const route = router(req.url)
    return route(req, res);
});


server.listen( port, () =>{
    console.log(`Server at ${port}`)
});