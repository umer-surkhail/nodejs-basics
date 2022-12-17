const { randomFillSync } = require('crypto');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const busboy = require('busboy');

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString('hex');
})();

http.createServer((req, res) => {
  if (req.method === 'POST') {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
    console.log(info);
    let extension = "";
    if(info.mimeType === "image/png")
        extension = '.png'
    // const saveTo = path.join('./images', `busboy-upload-${random()}.${extension}`);
    const saveTo = path.join('./images', info.filename);
      console.log("saveTosaveTosaveTosaveTo")
      console.log(saveTo)
      file.pipe(fs.createWriteStream(saveTo));
    });
    bb.on('close', () => {
      res.writeHead(200, { 'Connection': 'close' });
      res.end(`That's all folks!`);
    });
    req.pipe(bb);
    return;
  }
  res.writeHead(404);
  res.end();
}).listen(8081, () => {
  console.log('Listening for requests');
});