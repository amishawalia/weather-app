const request=require('request')

// making a common function for getting the location

const geocode=function geocode(address,callback)
{

const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW1pc2hhMTQxMSIsImEiOiJja21mejlsaWcyMzB6MnZxbHRydWl1ZGw3In0.4KHvwov4zaOWwCXQLVAjBw'


request({url:url,json:true},(error,response)=>
{
   if(error)
   callback('no network',undefined);
   else if(response.body.features.length==0)
   {
       callback('wrong location',undefined);

   }

   else// printing the data
   {
       callback(undefined,{
           latitude:response.body.features[0].center[1],
           longitude:response.body.features[0].center[0],
           location:response.body.features[0].place_name
       })
   }
})

}






module.exports=geocode;
