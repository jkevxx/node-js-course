import { createServer } from 'http';

const httpServer = createServer((req, res) => {
  console.log('Request accepted');

  // verb / method
  console.log(req.method);

  // path
  console.log(req.url);

  // headers
  console.log(req.headers);

  // body/payload
  let data = '';
  let chunkIndex = 0;
  req.on('data', (chunk) => {
    data += chunk;
    chunkIndex++;
    console.log(chunkIndex);
  });

  req.on('end', () => {
    // console.log(data);
    res.end('request received');
  });
});

httpServer.listen(3000);
