const {exec} = require('child_process');
exec('http-server dist -p 3100 --cors', function (err, stdout, stderr) {
  console.log(err, stdout, stderr)
})
