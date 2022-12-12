const http = require('http');

const busboy = require('busboy');

http.createServer((req, res) => {
  if (req.method === 'PUT') {
    console.log('POST request');
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      );
      file.on('data', (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      }).on('close', () => {
        console.log(`File [${name}] done`);
      });
    });
    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: ${val}`);
    });
    bb.on('close', () => {
      console.log('Done parsing form!');
    //   res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end("Hello");
    });
    req.pipe(bb);
  } else if (req.method === 'GET') {
    res.writeHead(200, { Connection: 'close' });
    res.end(`
      <html>
        <head></head>
        <body>
          <form method="POST" enctype="multipart/form-data">
            <input type="file" name="filefield"><br />
            <input type="text" name="textfield"><br />
            <input type="submit">
          </form>
        </body>
      </html>
    `);
  }
}).listen(8081, () => {
  console.log('Listening for requests');
});

// Example output:
//
// Listening for requests
//   < ... form submitted ... >
// POST request
// File [filefield]: filename: "logo.jpg", encoding: "binary", mime: "image/jpeg"
// File [filefield] got 11912 bytes
// Field [textfield]: value: "testing! :-)"
// File [filefield] done
// Done parsing form!