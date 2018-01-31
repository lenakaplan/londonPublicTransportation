const express = require('express')
const app = express();
const logic = require('./logic');

app.listen(3000, () => console.log('listening on port 3000'));

app.get('/departure_time', function(req, res){
	let from = req.query.from;
	let to = req.query.to;
	logic.getDepratingTime(from, to, function(err, response){
		res.send(response);
	});
});
