var pracBtn = document.getElementById("submit");
var showSome = document.getElementById("show-div");
var locationForm = document.getElementById('location-form');
var locale = document.getElementById('place');
var localTemp;
var place;
var messageDiv = document.getElementById('message-div');
var weathKey = localStorage.getItem("weathKey");
var weatherUrl;


pracBtn.addEventListener('click', function(event){
  // var location = locale.value;
  // var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${weathKey}`;
  var weathKey = localStorage.getItem("weathKey");
  if (!weathKey) {
    weathKey = prompt("Enter API Key:");
    var weathKey = localStorage.setItem("weathKey", weathKey);
  }
  place = locale.value;
  weatherUrl = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&APPID=3deb813b1e60983fb6dbaf734637d606`
  event.preventDefault();
  showSome.innerHTML = '';
  getData();
})


function getData(){
fetch(weatherUrl)
  .then(function(response) {
    return response.json();
    })
  .then(function(data) {
    localTemp = data.list[0].main.temp;
    showSome.innerHTML = `
                          <h5>The current temperature in ${data.city.name} is ${localTemp}C</h5>
                          
                          `
    locale.value = '';
  })
  .catch(error => setErrorMessage());
}

function setErrorMessage(){
  messageDiv.classList.add("message")
  messageDiv.innerText = `Error - Please check the location entered`;
  locale.value = '';

    setTimeout(function(){
      messageDiv.innerHTML = '';
      messageDiv.classList.remove('message');
    }, 2000);
}





