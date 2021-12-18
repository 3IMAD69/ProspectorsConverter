const btnEx = document.getElementById("btnex");

const fromCurrency = document.getElementById("FromDis");
const toCurrency = document.getElementById("ToDis");
const exchangeIcon = document.querySelector("form .icon");

const imgfrom = document.querySelector("#imgFrom");
const imgTO = document.querySelector("#imgTO");

$("form").submit(function(e){
  e.preventDefault();
});

$("#amount").keyup(function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
      $("#myBtn").click();
  }
});

exchangeIcon.addEventListener("click",()=>{
 let tmp = fromCurrency.value;
fromCurrency.value = toCurrency.value ; 
toCurrency.value = tmp ; 
 LoadImg(fromCurrency,imgfrom);
 LoadImg(toCurrency,imgTO);
})

function getExchange(){
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");

      if(fromCurrency.value =="gold" && toCurrency.value == "usd"){
        GoldToUsd(amount.value,(MyMoney)=>{
          exchangeRateTxt.innerText = MyMoney+" $";
        });
      }

      if(fromCurrency.value == "usd" && toCurrency.value == "gold"){
        UsdToGold(amount.value , (MyUsdGold)=>{
          exchangeRateTxt.innerText = MyUsdGold+" Gold";
        })
      }

      if(fromCurrency.value == "gold" && toCurrency.value == "wax"){
        GoldToWax(amount.value,(MyGoldwax)=>{
          exchangeRateTxt.innerText = MyGoldwax+" WAX";
        })
      }
      
      if(fromCurrency.value == "wax" && toCurrency.value == "gold"){
        WaxtoGold(amount.value , (MyWaxGold)=>{
          exchangeRateTxt.innerText = MyWaxGold+" Gold";
        })
      } 

      if(fromCurrency.value == "wax" && toCurrency.value == "usd"){
         WaxToUsd(amount.value , (MyWax)=>{
          exchangeRateTxt.innerText = MyWax+" $";
         })
      } 

      if(fromCurrency.value == "usd" && toCurrency.value == "wax"){
        UsdToWax(amount.value,(MyUSD)=>{
          exchangeRateTxt.innerText = MyUSD+" WAX";
        })
     } 


}

document.getElementById("myBtn").addEventListener("click", function() {
   getExchange();
});


function LoadImg(Currency,img){
    switch(Currency.value){
        case 'usd': img.src = 'img/us.png'
                    break; 
        case 'gold': img.src = 'img/gold.png'
                    break;           
       case 'wax': img.src = 'img/wax.png'
                    break;
  }
}

fromCurrency.addEventListener("change",()=>{
      LoadImg(fromCurrency,imgfrom);
      
    
})

toCurrency.addEventListener("change",()=>{
   LoadImg(toCurrency,imgTO);
  
})



let copyText = document.querySelector(".copy-text");
copyText.querySelector("button").addEventListener("click",function(){
  let input = copyText.querySelector("input.text");
  input.select();
  document.execCommand("copy");
  copyText.classList.add("active");
  window.getSelection().removeAllRanges();
  setTimeout(function(){
    copyText.classList.remove("active");
  },2500);
});




// function test(amount){
//   fetch("https://wax.alcor.exchange/api/markets/0")
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//     callback(data.last_price) ;
//   })
//   .catch(error => console.log(error))
// }

function GoldToUsd(gold,callback){
  GoldToWax(gold,(PglperWax)=>{
    WaxToUsd(PglperWax,(goldperusd)=>{
         callback(goldperusd.toFixed(2))
    })
  })
}

function UsdToGold(usd,callback){
   UsdToWax(usd,(usdwax)=>{
     WaxtoGold(usdwax,(MyWaxGold)=>{
        callback(MyWaxGold);
     })
   })
}

 


function UsdToWax(usd,callback){
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=usd")
  .then(response => {
    return response.json()
  })
  .then(data => {
    var WaxperUsd = data.wax.usd;
    callback((usd/WaxperUsd).toFixed(2));
  })
  .catch(error => console.log(error))
}



function GoldToWax(gold,callback){
  fetch("https://wax.alcor.exchange/api/markets/0")
  .then(response => {
    return response.json()
  })
  .then(data => {
    var PGL = parseFloat(gold).toFixed(3) / 1000 ;
    var PglWax = data.last_price ;// getting Pgl/Wax price 
    var MyGoldWax = PGL * PglWax ; // My pgl but in WAX
    //console.log(MyGoldWax);
    callback(MyGoldWax.toFixed(2))  ;
    
  })
  .catch(error => console.log(error))
}





function WaxtoGold(MyWax,callback){
  fetch("https://wax.alcor.exchange/api/markets/0")
  .then(response => {
    return response.json()
  })
  .then(data => {
    var PglWax = data.last_price;
    var MyWaxPgl = MyWax / PglWax ; 
    callback((MyWaxPgl*1000).toFixed(2))
  })
  .catch(error => console.log(error))
}


function WaxToUsd(MyWax,callback){
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=wax&vs_currencies=usd")
  .then(response => {
    return response.json()
    
  })
  .then(data => {
    var WaxperUsd = data.wax.usd;
    callback(MyWax*WaxperUsd);
  })
  .catch(error => console.log(error))
}

