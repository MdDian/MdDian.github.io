










/*
Moody WeatherApp--

The icons are very much inspired by Antoine Duval who, in turn, was inspired by Josh Bader..
https://codepen.io/antoineduval/pen/ALApwO

Eric Foster
*/



const Moody = ()=> {
// The url for the weather api..
  const apiURL = 'https://fcc-weather-api.glitch.me//api/current?';
  var _weather,
        _count,
       _click_,
         _temp,
   _isFahrenheit = true;

  function run() {
// Get the latitude and longitude of the user...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var lat = 'lat=' + position.coords.latitude,
            lon = 'lon=' + position.coords.longitude;
       
// Pass lat and lon into getLocalWeather function....
        _weather = JSON.parse(getLocalWeather(lat, lon));
// Set the temp member...      
        _temp = _weather.main.temp;
       
// Reveal 'click' button..
        _click_ = dom('.click')
          .class('hidden', '-')
          .click(()=> {
            configUI();
            _click_
              .class('hidden', '+');
          });
      });
    }
    
 // Set the click handler for Fahrenheit and Celcius swap...
    dom('.unit')
      .every((lmno)=> {
        lmno.click(()=> {
          if (_isFahrenheit) {
            dom('#F').class('hidden', '+');
            dom('#C').class('hidden', '-');
            _isFahrenheit = false;
            displayTemperature();
          } else {
            dom('#F').class('hidden', '-');
            dom('#C').class('hidden', '+');
            _isFahrenheit = true;
            displayTemperature();
          }
        });
    });
  }
  
// Convert, if needed, and display the current temperature...
  function displayTemperature() {
 // Determine what unit is needed, and convert to F if necessary..
    if (_isFahrenheit) {
 // Convert from celcius to farenheit...
      _temp = _temp * 9/5 + 32;
    } else {
      _temp = _weather.main.temp;
    }
    dom('#temp').text(_temp.toFixed(1));
  }
// Function for retrieving JSON Weather data from the api...
  function getLocalWeather(lat, lon) {
// Query the weather api...
     var json = xhr(url(apiURL, lon, '&', lat));
// Return json..
     return json;
  }

// Boolean function used to determine whether or not the sun is set...
  function isDay() {
// Get a unix timestamp...
    const unixTime = Date.now();
    // log(unixTime);
    // log(_weather.sys.sunrise * 1000);
    // log(_weather.sys.sunset * 1000);
    // log(new Date(_weather.sys.sunset * 1000));
// Check to see if the timestamp > that of today's sunrise...
    if (unixTime < _weather.sys.sunset * 1000) {
// If so, check to see if it is < or > that of sunset...
      if (unixTime > (_weather.sys.sunrise * 1000)) {
// If less than, it is still daytime, return false.
        return true;
      }
    }
// If the above condition is not met, it must be night, return true.
    return false;
  }

// Make UI adjustments for nighttime representation..
  function makeNightAdjustments() {
// Access dom elements and make changes..
    dom('.sun').class('hidden', '+');
    dom('.moon').class('hidden', '-');
    dom('body').bgColor('#470f66');
    dom('#name').color('#fcbe0b');
    dom('.text')
       .every((element)=> {
          element.color('#666666');
    });
    dom('.infoText').color('black');
  }
  
// Essentially a switch to match the condition with it's function. This is a bit redundant, but since
// I don't have an exhaustive list of the possible conditions, I need to have a default case, which a 
// switch provides.....
    function displayMoodyConfiguration(condition) {
// Cache the elements...
      var _clouds = dom('.clouds'),
             _sun = dom('.sun'),
       _moonStars = dom('#moonStars'),
            _moon = dom('.moon'),
        _lilCloud = dom('#lil-cloud'),
        _bigCloud = dom('#big-cloud'),
       _lightning = dom('.lightning'),
            _rain = dom('.rain'),
            _snow = dom('.snow');
      
// Switch on the current condition, mapping to a UI function...
      switch (condition) {
        case 'Clouds':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _lilCloud.class('hidden', '-');
          _bigCloud.class('hidden', '-');
          break;   
        case 'Rain':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _bigCloud.class('hidden', '-');
          _rain.class('hidden', '-');
          break; 
        case 'Clear':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          if (!isDay()) {
            _moonStars
              .class('hidden', '-');
            _moon
              .class('clearMoon', '+');
          } else {
            _sun
              .class('hidden', '-')
              .class('clearSun', '+');
          }
          break; 
        case 'Thunderstorm':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '-');
          });
          dom('#sun, #moonStars, #snow, #lil-cloud')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          break; 
        case 'Thundersnow':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '-');
          });
          dom('#sun, #moonStars, #rain, #lil-cloud')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          break; 
        case 'Drizzle':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          if (!isDay()) {
            _moonStars.class('hidden', '-');
            dom('#stars').class('hidden', '+');
          } else {
            _sun.class('hidden', '-');
          }
          dom('#rain, #big-cloud')
            .every((lmno)=> {
              lmno.class('hidden', '-');
          });
          dom('.drizzleX')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _rain.left('70px');
          break; 
        case 'Mist':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '-');
          });
          _rain.left('70px');
          _snow.class('hide', '+');
          _lightning.class('hide', '+');
          dom('.drizzleX')
            .every((lmno)=> {
              lmno.class('hide', '+');
          });
          _sun.class('hide', '+');
          _moonStars.class('hidden', '+');
          break; 
        case 'Fog':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _lilCloud.class('hidden', '-');
          _bigCloud.class('hidden', '-');
          break; 
        case 'Snow':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _snow.class('hidden', '-');
          _bigCloud.class('hidden', '-');
          break; 
        case 'Smoke':
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          _lilCloud
            .class('hidden', '-')
            .children()
              .every((lmno)=>{
                lmno.bgColor('#333333');
          });
          _bigCloud
            .class('hidden', '-')
            .children()
              .every((lmno)=>{
                lmno.bgColor('#666666');
          });
          break; 
        default:
          dom('.icon')
            .every((lmno)=> {
              lmno.class('hidden', '+');
          });
          if (!isDay()) {
            _moonStars.class('hidden', '-');
          } else {
            _sun.class('hidden', '-');
          }
          dom('#big-cloud').class('hidden', '-');         
          break; 
      }
    }
  
// Function takes JSON weather data as input, parses it, 
// and displays the appropriate weather icon and information..
  function configUI() {    
// Determine whether it is day or night..
    if (!isDay()) {
      makeNightAdjustments();
    }
    
// Get current weather condition..
    const condition = _weather.weather[0].main;

// Call UI manipulation function associated with the current condition...
    displayMoodyConfiguration(condition);
    
// Set the app data....
    displayTemperature();
    
    dom('#city').text(_weather.name);
    dom('#cond').text(condition);
    dom('#country').text(_weather.sys.country);
    
    dom('#title, #location, #temperature, #condition')
      .every((element)=> {
        element.class('hidden', '-');
    });
  }
  
 // Return Moody's only public method..
  return {
    run: run,
  }
}

// Once DOM is loaded, fire up the app..
 go
(()=> {
// Call initialization function...
   const
   moody = new Moody();
   moody.run();
});





