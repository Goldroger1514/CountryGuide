let searchBtn=document.querySelector('.search-btn');
let countryInp = document.querySelector('#country-input');
let result = document.querySelector('.result');
searchBtn.addEventListener('click', () => {
  result.innerHTML = '';
  if (countryInp.value != '') {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    getData(finalURL).then((data) => {
      //adding flag div
      let img = document.createElement("img");
      img.src = data[0].flags.svg;
      let flag = document.createElement("div");
      flag.classList.add("flag");
      flag.append(img);
      result.append(flag);
      //adding info about the country
      let infoDiv = document.createElement('div');
      infoDiv.classList.add('info');
      result.append(infoDiv);
      //Capital div
      let capital = document.createElement('div');
      capital.classList.add('capital');
      capital.textContent = `Capital: ${data[0].capital[0]}`;
      infoDiv.append(capital);
      //Continent div
      let continent = document.createElement('div');
      continent.classList.add('continent');
      continent.textContent = `Continent: ${data[0].continents[0]}`;
      infoDiv.append(continent);
      //Populatoin div
      let pop = document.createElement('div');
      pop.classList.add('population');
      pop.textContent = `Population: ${data[0].population}`;
      infoDiv.append(pop);
      //currency div
      let currency = document.createElement('div');
      currency.classList.add('currency');
      for (let prop in data[0].currencies) {
        currency.textContent = `Currency: ${data[0].currencies[prop].name}`;
      }
      infoDiv.append(currency);
      //languages div
      let lang = document.createElement('div');
      lang.classList.add('common-language');
      lang.textContent = `Common languages:`;
      for (let prop in data[0].languages)
      {
        console.log(data[0].languages[prop]);
        lang.textContent += ` ${data[0].languages[prop]},`;
        }
      infoDiv.append(lang);
      console.log(data);
    });
  } else {
    countryInp.value = `this can't be empty`;
  }
})
function getData(url) {
  return new Promise((res, rej) => {
      let req = new XMLHttpRequest();
      req.onload = function () {
        if (this.readyState == 4 && this.status == 200)
          res(JSON.parse(this.response));
        else
          rej('Error not found');
      };
      req.open("GET", url);
      req.send();
  })
}