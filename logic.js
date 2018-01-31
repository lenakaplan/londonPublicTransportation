
const request = require('request');
const axios = require('axios'); 
const GET_JOURNEY = 'https://api.tfl.gov.uk/Journey/JourneyResults';
const GET_NEAREST_STOPS = 'https://api.tfl.gov.uk/StopPoint';
const STOP_TYPES = `NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanFerryPort,NaptanPublicBusCoachTram`;
function getNearestStops(location){
    let locationArr = location.split(',');
    let lat = locationArr[0];
    let lon =locationArr[1];
    let url = `${GET_NEAREST_STOPS}?lat=${lat}&lon=${lon}&stoptypes=${STOP_TYPES}`;
    return axios(url);
}

module.exports = {
    async getDepratingTime(from, to, callback){
        let startPoint  = await getNearestStops(from);
        let endPoint  = await getNearestStops(to);
        let startId = startPoint.data.stopPoints[0].id;
        let endId = endPoint.data.stopPoints[0].id;
        let url = `${GET_JOURNEY}/${startId}/to/${endId}?timeIs=Departing`;
        request(url, function(err, response, body){
            if (err){
                callback();
                return;
            }
	        let obj = JSON.parse(response.body);
	        console.log(obj.searchCriteria.dateTime);
	        callback(null, obj.searchCriteria.dateTime);
        });
    }
};

