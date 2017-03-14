var express = require('express');
var ip = require('ip');
var os = require('os');
var app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', function(req,res){
  var ipAdd = ip.address();
  var lang = req.headers['accept-language'];
  var osPlat = os.platform();
  var osRel = os.release();
  var obj = {
    'ipaddress' : ipAdd,
    'language' : lang,
    'software' : osPlat + ', ' + osRel
};
  res.send(obj);
});



app.listen(app.get('port'), function(){
  console.log('Header parser listening on port ' + app.get('port'));
});
