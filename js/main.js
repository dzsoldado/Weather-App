$(document).ready(function(){
  
  var latitude="" ; var longitude="";var requestWeather="";
  var cel,feh;
        /* fahrenheit / celsius */
      $("#temperature").click(function(){
        if ($("#unit").text()=="C"){
          $("#temp").text(feh);
          $("#unit").text("F");
        }else if($("#unit").text()=="F"){
          $("#temp").text(cel);
          $("#unit").text("C");
        }
      });
  
  /* getting geolocation*/
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  };
  
  function errorFunction() {
    $("#location").text("Failed to get your current location");
  }
  
  /* getting weather details*/
  function successFunction(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    request="https://fcc-weather-api.glitch.me/api/current?lat="+latitude+"&lon="+longitude;

 /* Showing the weather */
    $.getJSON(request,function(json){
 
      $("#location").text(json.name+", "+json.sys.country);
      $("#weather").text(json.weather[0].main);
      $("#temp").text(parseInt(json.main.temp)+"°");
      $("#unit").text("C");
      cel= parseInt(json.main.temp)+"°";
      feh= parseInt(json.main.temp*1.8+38)+"°";
      
      

 /* Icons */

      if ($("#weather").text()=="Clear"){ 
        $("#icon").html('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div> ');
      }
      else if($("#weather").text()=="Clouds" || $("#weather").text()=="Mist"){
        $("#icon").html('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
      }
      else if($("#weather").text()=="Rain"){
        $("#icon").html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');  
      }
      else if($("#weather").text()=="Thunderstorm" ){
        $("#icon").html('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
      }
      else if($("#weather").text()=="Snow" ){
        $("#icon").html('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
      } 
      

    });

  };
  
})