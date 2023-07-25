let searchBtn=document.getElementById("search-btn");
let countryInp=document.getElementById("country-inp");

const result=document.getElementById("result");
searchBtn.addEventListener("click",getData);

async function getData(){
    let url=`https://restcountries.com/v3.1/name/${countryInp.value}?fullText=true`;
    const response = await fetch(url);

    if(!response.ok){
        if(countryInp.value.length===0){
            result.innerHTML=`
                <h5 style="margin:1rem ; color:red; font-weight:normal"> Input Field Cannot Be Empty </h5>
            `
    
        }
        else{
            result.innerHTML=`
                <h5 style="margin:1rem ; color:red; font-weight:normal"> Invalid Country Name</h5>
            `
        }

        return;
    }
    

    const data=await response.json();

    displayData(data[0]);
}

function displayData(data){

    // console.log(`${Object.keys(data.currencies)[0]} - ${Object.values(data.currencies.INR)[0]}`);

    // console.log(data)

    const sym=Object.keys(data.currencies)[0];
    console.log(sym);

    result.innerHTML=`
    
        <img src="${data.flags.svg}" class="flag-img">
        <h2>${data.name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data.capital[0]}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data.continents[0]}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data.population}</span>
            </div>
        </div>
        
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${Object.values(data.currencies[sym])[0]} - ${Object.keys(data.currencies)[0]}</span>
            </div>
        </div>

        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data.languages).join(", ")}</span>
            </div>
        </div>
    `;

    // console.log(Object.values(data.languages).join(", "));
}