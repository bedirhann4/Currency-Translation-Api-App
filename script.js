const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");
const change = document.getElementById("change");
const conclusion = document.getElementById("conclusion");
const onesPrice = document.getElementById("unit-price");
const onesPrice2 = document.getElementById("unit-price2");
const unitPrice = document.getElementById("unitPrice");
const timeDate = document.getElementById("timeDate");
const spinner = document.getElementById("spinner");
const conclusionArea = document.getElementById("conclusion-bottom-area");
const translatedAmount = document.getElementById("translatedAmount");
var c_from; 
var c_to;
var c_amount;
from.addEventListener("change", () => {
    c_from = from.value;
})
to.addEventListener("change", () => {
    c_to = to.value;
})
change.addEventListener("click", () => {
    if(invalidError()){
        spinner.style.display = "inline-block";
        translatedAmount.innerHTML = amount.value;
        exchangerates_data(c_to,c_from,c_amount);
    }
})
document.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        if(invalidError()){
            spinner.style.display = "inline-block";
            translatedAmount.innerHTML = amount.value;
            exchangerates_data(c_to,c_from,c_amount);
        }
    }
})
from.onchange = (event) => {
    onesPrice.innerHTML = " " + event.target.options[event.target.selectedIndex].textContent;
    onesPrice2.innerHTML = " " + event.target.options[event.target.selectedIndex].textContent;
}
function exchangerates_data(c_to,c_from,c_amount){
    c_amount = amount.value;
    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${c_to}&from=${c_from}&amount=${c_amount}`;
    const myHeaders = new Headers();
    myHeaders.append("apikey", "<Api_Key_Area>");
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            let result = data.result;
            conclusion.innerHTML= " "+result.toLocaleString('aa',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + data.query.to;
            unitPrice.innerHTML = " "+data.info.rate.toLocaleString('aa',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + data.query.to;
            timeDate.innerHTML = " " + data.date;
            spinner.style.display = "none";
        })
        .catch(error => console.log(error))
        conclusionArea.style.opacity = 1;
}
const invalidError = () => {
    if(from.value == 0){
        document.getElementById("select1").innerText = "Please Select Currency";
        return;
    }else{
        document.getElementById("select1").innerText = "";
    }
    if(to.value == 0){
        document.getElementById("select2").innerText = "Please Select Currency";
        return;
    }else{
        document.getElementById("select2").innerText = "";
    }
    if(amount.value == ""){
        document.getElementById("select3").innerText = "Please Enter Amount";
        return;
    }else{
        document.getElementById("select3").innerText = "";
    }
    return true;
}
