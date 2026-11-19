let WeatherCall = {

    fetchWeather : async function(city){
        try {
            const response = await fetch('/api/weather?' + new URLSearchParams({ city }));
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            this.DisplayWeather(data);
        } catch (error) {
            console.error(error.message);
        }
    },
    DisplayWeather : function(data){

        const {description , icon} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        const {country} = data.sys;
        const {name} = data;

        document.querySelector('.city-span').innerText = name;
        document.querySelector('.temp-span').innerText = temp;
        document.querySelector('.weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
        document.querySelector('.stat-span').innerText = description;
        document.querySelector('.humid-span').innerText = humidity;
        document.querySelector('.wind-span').innerText = speed; 
        document.querySelector('.hidden-card').classList.remove('visible');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name + "')";
    },  
    search : function(){

        const search = document.querySelector('.search-bar').value;
        this.fetchWeather(search);
    },
}

document.querySelector('.search-icon').addEventListener('click' , function(){

    WeatherCall.search();
});

document.querySelector('.search-bar').addEventListener('keyup' , function(event){

    if (event.key == "Enter"){

        WeatherCall.search();
    }
});
