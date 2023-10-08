$.getScript( "https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places") 
.done(function( script, textStatus ) {
    google.maps.event.addDomListener(window, "load", initAutoComplete)
})


let autocomplete;

function initAutoComplete(){
   autocomplete = new google.maps.places.Autocomplete(
       document.getElementById('places-autocomplete'),
       {
           types: ['address'],
           //default in this app is "UK"
           componentRestrictions: {'country': ['CA', 'US']}
       });

   autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged (){

    var place = autocomplete.getPlace();

    if(!place.geometry) {
        document.getElementById('places-autocomplete').placeholder = 'Address*';
    } else {
        var finalAddress = "";

        for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
        
                        if (place.address_components[i].types[j] == "street_number") {
                            finalAddress += place.address_components[i].long_name + ' '
                        }
                        if (place.address_components[i].types[j] == "route") {
                            finalAddress += place.address_components[i].long_name + ', '
                        }
                        if (place.address_components[i].types[j] == "postal_town") {
                             finalAddress += place.address_components[i].long_name + ', '
                        }                    
                        if (place.address_components[i].types[j] == "locality") {
                            finalAddress += place.address_components[i].long_name + ', '
                        }
                        if (place.address_components[i].types[j] == "administrative_area_level_1") {
                            finalAddress += place.address_components[i].long_name + ', '
                        }
                        if (place.address_components[i].types[j] == "country") {
                            finalAddress += place.address_components[i].long_name + ', '  
                        }
                        if (place.address_components[i].types[j] == "postal_code") {
                            finalAddress += place.address_components[i].long_name;
                        }
                    }
                }
        
        $('#places-autocomplete').val(finalAddress);
    }

    // var place = autocomplete.getPlace();

    // var geocoder = new google.maps.Geocoder()
    // var address = document.getElementById('places-autocomplete').value

    // geocoder.geocode( { 'address': address}, function(results, status) {

    //     if (status == google.maps.GeocoderStatus.OK) {
    //         var latitude = results[0].geometry.location.lat();
    //         var longitude = results[0].geometry.location.lng();

    //         $('#id_longitude').val(longitude) 
    //         $('#id_latitude').val(latitude) 
    //     } 
    // }); 

    // if (!place.geometry){
    //     document.getElementById('places-autocomplete').placeholder = "*Begin typing address";
    // }
    // else{
        
    //     for (var i = 0; i < place.address_components.length; i++) {
    //         for (var j = 0; j < place.address_components[i].types.length; j++) {

    //             if (place.address_components[i].types[j] == "street_number") {
    //                 var num = place.address_components[i].long_name  
    //             }
    //             if (place.address_components[i].types[j] == "route") {
    //                 var addy = place.address_components[i].long_name
    //             }
    //             if (place.address_components[i].types[j] == "postal_town") {
    //                  $('#id_town').val(place.address_components[i].long_name)   
    //             }                    
    //             if (place.address_components[i].types[j] == "administrative_area_level_2") {
    //                 $('#id_county').val(place.address_components[i].long_name)   
    //             }
    //             if (place.address_components[i].types[j] == "country") {
    //                 $('#id_country').val(place.address_components[i].long_name)   
    //             }

    //             if (place.address_components[i].types[j] == "postal_code") {
    //                 $('#id_post_code').val(place.address_components[i].long_name)   
    //             }
    //         }
    //     }
    //     $('#id_address').val(num + " " + addy)
    // }
}