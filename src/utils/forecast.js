const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
   const url='http://api.weatherstack.com/current?access_key=e9d312717fe54887debeab8704d583ad&query=' + latitude + ',' + longitude + '&units=f';
   //const url='http://api.weatherstack.com/current?access_key=e9d312717fe54887debeab8704d583ad&query=37.8267,-122.4233&units=f'
   // console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(body)
            callback(undefined,body.current.weather_descriptions[0] +' It is currently ' + body.current.temperature + ' fahrenheit out. There is a ' +body.current.precip + ' % chance of rain.')

            //callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast