const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js')
const foreCast = require('./utils/forecast.js')
const forecast = require('../../weather-app/utils/forecast.js')

const app = express()
const port= Process.env.PORT || 3000   //setting the heroku port
//app.disable('x-powered-by') / depricate error removal
const publicDirectory = path.join(__dirname ,'../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const Partialspath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory))
app.set('view engine','hbs') // it will work if the  hbs file folder name is views . we can customize the same
app.set('views',viewDirectory)
hbs.registerPartials(Partialspath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sneha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sneha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sneha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error:'Please Provide the Address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return  res.send({error})
        }
        foreCast(latitude,longitude,(error,forecastdata)=>{
            if(error){
               return  res.send('No location found')
            }
           // console.log(latitude,longitude)
            res.send({
                foreCast:forecastdata,
                location,
                address:req.query.address 
            })
        })
    


    }) 
    
})



//query string
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please provide the Search term'
        })
    }
   
    res.send({
        products:[]
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sneha',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sneha',
        errorMessage: 'Page not found.'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port,()=>{
    console.log('Server is running on ${port}')
})