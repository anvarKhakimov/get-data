var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello world!');
});

app.get('/data/:start/:end', function(req, res){
	console.log(req.route);
	var start, end, result;

	start = parseInt( req.route.params.start );
	end = parseInt( req.route.params.end );

	start = new Date(2014,2,20,11,33,0).getTime();
	end = new Date(2014,2,21,13,33,0).getTime();

	result = getDataByDate(start, end);
	res.json(200, result)
});

app.listen(3000);


function getDataByDate(start, end){
	var diff, result = {};

	if( start >= end ) return result;

	var diff = end - start;

	console.log(diff);

	result[start] = [ Math.random() ];

	for( var i = 0; i < Math.round(diff); i++ ){
		result[i] = i;
		console.log(i);
	}

	return result;
}