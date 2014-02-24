var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello world!');
});

app.get('/data/:start/:end', function(req, res){
	var start, end, result;

	start = parseInt( req.route.params.start );
	end = parseInt( req.route.params.end );

	//start = new Date(2014,2,20,11,0,0).getTime();
	//end = new Date(2014,2,20,11,0,0).getTime();

	result = getDataByDate(start, end);
	res.json(200, result)
});

app.listen(3000);


function getDataByDate(start, end){
	var diff = end - start
		, fullHours = new Date(start)
		, isFullHours = new Date(start).getUTCMinutes() == 0
		, result = {};

	if( start > end ) return result;

	// lead to the next full hour
	if( !isFullHours ) {
		fullHours.setUTCMinutes(0)
		fullHours.setUTCHours( new Date(start).getUTCHours() + 1 );
	}

	// (60*60*1000) - one hour
	// @todo change results to 
	for( var i = 0; i + fullHours.getTime() <= end; i += (60*60*1000) ){
		if( i == 0 ) result[ new Date(start)] = start;
		result[ new Date(i + fullHours.getTime()) ] = i;
	}

	if( !isFullHours ) result[ new Date(end) ] = end;

	return result;
}