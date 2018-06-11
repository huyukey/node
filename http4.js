const querystring = require('querystring');
const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    console.log('method: ', req.method);

    if (req.method.toUpperCase() == 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            console.log('Content-Type: ', req.headers['Content-Type']);
            const contentType = req.headers['Content-Type'];
            if (contentType.search('urlencoded') > 0) {
                const parsed = querystring.parse(body);
            } else if (contentType.search('json') > 0) {
                const parsed = JSON.parse(body);
            } else {
                // multipart
            }
            console.log('body: ', body);
            res.end('OK');
        });
    } else {
        res.end('not POST OK');
    }

});

server.listen(3000, () => {
    console.log('imageRequest');
});