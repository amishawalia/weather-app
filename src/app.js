const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./util/geocode')
const forecast=require('./util/forecast')



const app=express()

// get takes 2 parameters 1 is path and 2 is func which has request and response
// response sends the data back either in html format or json format 
// sending an object will automatically stringify it


// setting up the partials
const viewPath=path.join(__dirname,'../templates/views')
const partial_path=path.join(__dirname,'../templates/partials')
const index_path=path.join(__dirname,'../public')


// if we change the name from views to anything else it will give us an error so now we need to givw the path to that folder
// setting up handlebars i.e dynamic template to the server

app.set('view engine', 'hbs')// for the template
app.set('views',viewPath)
hbs.registerPartials(partial_path)



 
//server 1//because of this we are able to use all tthe files prsent in public directory
//setting up static directory to server
app.use(express.static(index_path));
// to add the template engine we use render with response




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amisha'
    })
})

app.get('/index',(request,response)=>
{
    // render takes 2 parameters 1 is the hbs file name and the second(optional) is the content to be wriiten/appended 
    response.render('index',{name:'amisha'})
})


app.get('/about',(request,response)=>
{
    // render takes 2 parameters 1 is the hbs file name and the second(optional) is the content to be wriiten/appended 
    response.render('about',{title:'About',name:'amisha'})
})

app.get('/help',(request,response)=>
{
    // render takes 2 parameters 1 is the hbs file name and the second(optional) is the content to be wriiten/appended 
    response.render('help',{title:'Help',message:'do u need any help'})
})


//server 2
app.get('/weather',(request,response)=>
{
    if(!request.query.address)
    {
        response.send('Error provide the address')
    }


    geocode(request.query.address,(error,data={})=>
    {
         if(error)
         return response.send({error})

         forecast(data.latitude,data.longitude,(error,forecast_data)=>
         {
              if(error)
              return response.send({error})

              response.send({
                  forecast:forecast_data,
                  location:data.location,
                  address:request.query.address
              })

         })

    })
     
})

// wildcard server for all the mismatching values

app.get('/help/*',(request,response)=>
{
    response.render('error',{message:'help page not found'})
})

app.get('*',(request,response)=>
{
    response.render('error',{message:'page not found'})
})

app.listen(3000,()=>
{
    console.log("this is on the browser")
})


// const path = require('path')
// const express = require('express')

// const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.set('view engine', 'hbs')



// app.use(express.static(publicDirectoryPath))



// app.get('/about', (req, res) => {
//     res.render('about', {
//         //title: 'About Me',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         message: 'This is some helpful text.'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })