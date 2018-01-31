const express = require('express')
const app = express();
const request = require('request');
const logic = require('./logic');
const STOPS = [  "NaptanBusCoachStation",  "NaptanMetroStation", "NaptanRailStation"];

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/deprature_time', function(req, res){
	let from = req.query.from;
	let to = req.query.to;
	console.log(from);
	console.log(to);

	logic.getDepratingTime(from, to, function(err, res){
		res.send(res);
	});
});
