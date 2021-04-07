console.log('Client side javascript file is loaded!')





const form_data=document.querySelector('form');
const input_data=document.querySelector('input')
const msg_one=document.querySelector('#one')
const msg_two=document.querySelector('#two')

form_data.addEventListener('submit',(e)=>
{
  e.preventDefault();
  const location=input_data.value;
  const url='http://localhost:3000/weather?address='+location;

  msg_one.textContent='Loading...'
  fetch(url).then((response)=>
{
     response.json().then((data)=>
     {
            if(data.error)
            msg_one.textContent=data.error;
            else
            {
                msg_one.textContent=data.forecast
                msg_two.textContent=data.location
            }
     })
})


})