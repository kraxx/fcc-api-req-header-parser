var express = require('express');
var ip = require('ip');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req,res){
  // var ipAdd = ip.address();
  var ipAdd = req.headers["x-forwarded-for"];
  var lang = req.headers['accept-language'].split(',')[0];
  var osPlat = req.headers['user-agent'].split(') ')[0].split(' (')[1];
  var obj = {
    'ipaddress' : ipAdd || ip.address(),
    'language' : lang,
    'software' : osPlat
};
  console.log(req.headers);
  res.send(JSON.stringify(obj));
});

app.listen(app.get('port'), function(){
  console.log('Header parser listening on port ' + app.get('port'));
});

function getClientIp(req) {
  var ipAddress;
  var forwardedIpsStr = req.headers["x-forwarded-for"];
  if (forwardedIpsStr) {
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[forwardedIps.length-1];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};
