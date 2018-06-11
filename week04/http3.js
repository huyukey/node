const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    console.log(req.url);

    const path = 'img' + req.url;

    fs.readFile(path, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        res.write(data);
        res.end();
    });
});

server.listen(3000, () => {
    console.log('imageRequest');
});