$.getScript("https://maps.googleapis.com/maps/api/js?key=" + google_api_key + "&libraries=places")
    .done(function (script, textStatus) {
        google.maps.event.addDomListener(window, "load", initAutoComplete)
    })


let autocomplete;

function initAutoComplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('places-autocomplete'),
        {
            types: ['address'],
            componentRestrictions: { 'country': ['CA'] }
        });

    autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged() {

    var place = autocomplete.getPlace();

    if (place.geometry) {
        for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {

                if (place.address_components[i].types[j] == "street_number") {
                    $('#places-autocomplete').val(place.address_components[i].long_name);
                }
                if (place.address_components[i].types[j] == "route") {
                    $('#places-autocomplete').val($('#places-autocomplete').val() + ' ' + place.address_components[i].long_name);
                }
                if (place.address_components[i].types[j] == "locality") {
                    $('#city').val(place.address_components[i].long_name);
                    document.getElementById('city').dispatchEvent(new Event('input'));
                }
                if (place.address_components[i].types[j] == "postal_code") {
                    $('#postal-code').val(place.address_components[i].long_name);
                    $('#postal-code').val($('#postal-code').val().replace(/[^\w]/g, ''));
                    document.getElementById('postal-code').dispatchEvent(new Event('input'));
                }
            }
        }

        $('#hidden-address').removeAttr('hidden');
    }
}