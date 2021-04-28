const request = require("postman-request")


// const geoCode = (address,callback)=>{
//     const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic25laGE0NzIiLCJhIjoiY2tuOGpucnNqMDY5aDJ1bWx2NjV4ODZjbyJ9.Rb_8mUlTmvzOkm-H3hKGBw&limit=1'
//     request({url:url,json:true},(error,response)=>{
//        // console.log(response)
//         if(error) {
//             callback('please check the location',undefined)
//         }
//         if(response.body.features.length===0){
//             callback('please check the URL',undefined)

//         }else{
//             callback(undefined,{latitude:response.body.features[0].center[1],
//                 longitude:response.body.features[0].center[0],
//                 location : response.body.features[0].place_name

//             })
//         }

//     })
// }

//destructuring implementation
const geoCode = (address,callback)=>{
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic25laGE0NzIiLCJhIjoiY2tuOGpucnNqMDY5aDJ1bWx2NjV4ODZjbyJ9.Rb_8mUlTmvzOkm-H3hKGBw&limit=1'
    request({url //implemented here
        ,json:true},(error,{body})=>{
       // console.log(response)
        if(error) {
            callback('please check the location',undefined)
        }
        if(body.features.length===0){
            callback('please check the URL',undefined)

        }else{
            callback(undefined,{latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location : body.features[0].place_name

            })
        }

    })
}


module.exports = geoCode
