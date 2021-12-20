const {exec} = require('child_process');
exec('npm run serve', function (err, stdout, stderr) {
  console.log(err, stdout, stderr)
})
