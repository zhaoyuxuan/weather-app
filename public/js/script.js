var map;
var marker;
var location = {"lat": -25.363, "lng": 131.044};
function initMap(location) {
  
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: location,
        streetViewControl: false,
        mapTypeControl: false
    });
    map.setOptions({
        zoomControl: true,
        gestureHandling: 'none'
    });
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}


var citydata;
var searchData = [];


function parseData() {
    citydata = JSON.parse(localStorage.citydata);
    for (cityid in citydata) {
        searchData.push({
            label: citydata[cityid],
            value: cityid
        })
    }
}

function getcityoption() {
    var formData = new FormData();

    $.ajax({
        type: "POST",
        url: "/citydata",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            localStorage.setItem("citydata", JSON.stringify(response));
            parseData();
        }
    });
}




$("#inputcity").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(searchData, request.term);
        response(results.slice(0, 10));

    },
    select: function(event, ui) {
        event.preventDefault();
        $("#inputcity").val(ui.item.label);
        var inputid = ui.item.value;
        var formData = new FormData();
        formData.set("userInput", inputid);
        $.ajax({
            type: "POST",
            url: "/weatherdata",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {

                let location = {};

                let locationdata = response["city"]["coord"]
          
                var latlng = new google.maps.LatLng(locationdata["lat"], locationdata["lon"]);
                marker.setPosition(latlng);
              
                response = response["list"];

                $(".infogroup").show();
                $("#map").show();
                console.log(response);
                for (i = 1; i < 6; i++) {
                    $("#main" + i).text(Math.round(response[i - 1]["main"]["temp"] - 273.15) + "˚C");
                    $("#windspeed" + i).text("Windspeed: " + response[i - 1]["wind"]["speed"] + "m/s");
                    $("#humidity" + i).text("Humidity: " + response[i - 1]["main"]["humidity"]);
                    $("#weatherstate" + i).text(response[i - 1]["weather"][0]["main"]);
                    var weathercode = response[i - 1]["weather"][0]["id"];
                    

                    $("#icon" + i).addClass("wi wi-owm-" + weathercode + " wi-fw");
                }
            }
        });
    },
    focus: function(event, ui) {
        event.preventDefault();
        $("#inputcity").val(ui.item.label);
    }
});



$.ui.autocomplete.filter = function(array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function(value) {
        return matcher.test(value.label || value.value || value);
    });

};

getcityoption();