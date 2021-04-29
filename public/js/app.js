

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://api.weatherstack.com/current?access_key=e9d312717fe54887debeab8704d583ad&query=37.8267,-122.4233').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log('Please try other location')
//         }else{
//             console.log('Location is: '+data.location.name+' Lat : '+data.location.lat+' Lon: '+ data.location.lon)
//         }
//         console.log(data)
//     })
// })
const weathForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

weathForm.addEventListener('submit',(e)=>{
    // each time submits browser will refresh and we wil lose the data. in order to prevent that use preventDefault
    e.preventDefault()
    const location = searchInput.value
    msgOne.textContent ='Loading ...'
    msgTwo.textContent = ' '
    fetch('/weather?address='+location).then((response)=>{  //http://localhost:3000 add this if we are using local and remove if we are using heroku
    response.json().then((data)=>{
        if(data.error){
            //console.log('Please check the URL')
            msgOne.textContent =data.error
        }else{
          //  console.log(data.location)
           // console.log(data.forecast)
           //console.log(data)
           msgTwo.textContent=data.foreCast 
           msgOne.textContent =data.location
          

        }
       
       
    })
   })
   // console.log(location)
})
