var request = new XMLHttpRequest;

request.open('GET','https://openexchangerates.org/api/currencies.json',true);

var data;
var currencycodes;
var currencyarray;
var currencyselectfrom = document.querySelector(".currency-select-from");
var currencyselectto = document.querySelector(".currency-select-to");
var currentvalue = document.querySelector(".currency-from");
var convertnow = document.querySelector(".final");
var result = document.querySelector(".result");
var answer;
var currentexchangerates;

request.onload = function(){
     data = JSON.parse(this.response);
     currencyarray = Object.entries(data);
     currencycodes = Object.keys(data);
     
     currencyarray.forEach(code => {
          var key = code[0];
          var value = code[1];

          var op = document.createElement("option");
          op.textContent = key + "-"+ value;
          op.value = key;
          currencyselectto.appendChild(op);
     });

     currencyarray.forEach(code => {
          var key = code[0];
          var value = code[1];

          var op = document.createElement("option");
          op.textContent = key + "-"+ value;
          op.value = key;
          currencyselectfrom.appendChild(op);
     });

     var request2 = new XMLHttpRequest;

     request2.open('GET','https://openexchangerates.org/api/latest.json?app_id=59c9ff218785482095cbbe4b87349c39',true);

     request2.onload = function(){
          var data2 = JSON.parse(request2.response);
          currentexchangerates = data2.rates;
          console.log(currentexchangerates); 

          /*Trying something here*/

          convertnow.addEventListener("click",function(){
               var acamount = currentvalue.value;
               answer = (acamount/courfr) 

          })
          /*Still trying*/
          
     }
     request2.send();

}
request.send();

