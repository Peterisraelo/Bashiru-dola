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
var curfro;
var curto;
var acamount;

/*Format function*/

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
     try {
       decimalCount = Math.abs(decimalCount);
       decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
   
       const negativeSign = amount < 0 ? "-" : "";
   
       let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
       let j = (i.length > 3) ? i.length % 3 : 0;
   
       return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
     } catch (e) {
       console.log(e)
     }
}
     /*Format function end*/

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

          /*Trying something here*/

          convertnow.addEventListener("click",function(){
               acamount = currentvalue.value;

               console.log(acamount);
               curfro = currencyselectfrom.value;
               curto = currencyselectto.value;

               answer = (acamount/currentexchangerates[curfro]) * currentexchangerates[curto];
               console.log(answer);
               answer = formatMoney(answer);
               result.textContent = answer + " " +curfro;

          })
          /*Still trying*/
          
     }
     request2.send();

}
request.send();

