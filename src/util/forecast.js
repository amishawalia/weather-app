const request=require('request')

// making a common function for getting the location

const forecast=function forecast(lat,long,callback)
{

const url='https://api.darksky.net/forecast/fda209e790e2ec3a2e0a4ba67528a366/'+lat+','+long;


request({url:url,json:true},(error,response)=>
{
   if(error)
   callback('no network',undefined);
   else if(response.body.error)
   {
       callback('wrong location',undefined);

   }

   else// printing the data
   {
       callback(undefined,'Currently the temp is '+response.body.currently.temperature+' and the chances of precipitation is '+response.body.currently.precipProbability);
   }
})

}


module.exports=forecast;
