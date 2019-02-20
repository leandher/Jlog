var express = require('express');
var fs = require('fs');
var router = express.Router();

const path = 'log.txt';

router.get('/', function(req, res) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) throw err;

    const logs = data.split(';');

    const html = `
    <html>
      <body style="background: black;color: greenyellow;">
        <h2>Jlog</h2>
        ${logs.map(log => `<p>${log}</p>`)}
      </body>
    </html>
    `;

    console.log(html.replace(/>,</g, '><'));

    res.send(html.replace(/>,</g, '><'));
  });
});

router.post('/', function(req, res) {
  let data = JSON.stringify(req.body);

  data = `[${new Date()}]: ${data};\r\n`;

  console.log(data);

  fs.writeFile(path, data, { flag: 'a+' }, function(err) {
    if (err) throw err;
    res.send("It's saved!");
  });
});

module.exports = router;
