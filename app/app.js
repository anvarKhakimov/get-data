var express = require('express');
var app = express();

//settings
app.enable("jsonp callback");

app.get('/', function(req, res){
	res.send('<h1>Hello user!</h1> Nice to meet you. This is the app, that will send you random data depending on the params of timestamp. </br> Example: go to <code>/data/1392872400000/1393509064727</code> and grab the data.');
});

app.get('/data/:start/:end', function(req, res){
	var start, end, callback, result;

	start = parseInt( req.route.params.start );
	end = parseInt( req.route.params.end );
	jsonCallback = req.query.callback;

	result = getDataByDate(start, end);
	res.jsonp(200, result)
});

app.listen(3000);


function getDataByDate(start, end){
	var diff = end - start
		, fullHours = new Date(start)
		, isFullHours = new Date(start).getUTCMinutes() == 0
		, result = [];

	if( start > end ) return result;

	// lead to the next full hour
	if( !isFullHours ) {
		fullHours.setUTCMinutes(0);
		fullHours.setUTCHours( new Date(start).getUTCHours() + 1 );
	}

	// (60*60*1000) - one hour
	// @todo change results to 
	var counter = 0;
	var increase = Math.PI * 2 / 100;

	for( var i = 0; i + fullHours.getTime() <= end; i += (60*60*1000) ){

		// first piece
		if( i == 0 ) result.push([ start, (Math.sin( counter ) / 2 + 1) * 10 ]);

		result.push([ i + fullHours.getTime(), (Math.sin( counter ) / 2 + 1) * 10 ]);

		counter += increase;
		// last piece
		//if( (i + 0*60*1000)<= end && !isFullHours ) result.push([ end, end ]);
	}	

	return result;
}