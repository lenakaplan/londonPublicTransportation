
const request = require('request');
const axios = require('axios'); 
const GET_JOURNEY = 'https://api.tfl.gov.uk/Journey/JourneyResults';
const GET_NEAREST_STOPS = 'https://api.tfl.gov.uk/StopPoint';

function getNearestStops(location){
    let locationArr = location.split();
    let lat= locationarr[0];
    let lon=locationArr[1];
    let stopTypes=`NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanFerryPort,NaptanPublicBusCoachTram`;
    let url = `${url}?lat=${lat}&lon=${lon}&stoptypes=${stopTypes}`;
    console.log(url);
    return axios(url);
}

module.exports = {
    async getDepratingTime(from, to, callback){
        let startPoint  = await getNearestStops(from);
        let endPoint  = await getNearestStops(to);
        console.log(startPoint);
        console.log(endPoint);
        let url = `GET_JOURNEY/${startPoint}/to/${endPoint}?timeIs=Departing`;
        console.log(url);
        request(url, function(err, response, body){
	        let obj = JSON.parse(response.body);
	        console.log(obj.searchCriteria.dateTime);
	        callback(null, obj.searchCriteria.dateTime);
        });
    }
}

