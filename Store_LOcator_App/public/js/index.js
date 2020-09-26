let map;
let infoWindow;
let markers = [];
let clickedStore = 0;

function initMap() {
    let losAngeles = {
        lat: 34.052235,
        lng: -118.243683
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: losAngeles,
        zoom: 11,

    });

    infoWindow = new google.maps.InfoWindow();


}



const setOnClickListener = () => {
    let storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach((elem, index) => {
        elem.addEventListener('click', () => {
            google.maps.event.trigger(markers[index], 'click');
        })

    })

}

const onEnter = (e) => {
    if (e.key == "Enter") {
        getStores()
    }
}

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;


}

const noStoresFound = () => {
    const html = `
    <div class="no-stores-found">
        No Stores Found
    </div>  
    `
    document.querySelector('stores-list').innerHTML = html;
}

const createMarker = (latlng, name, address, phoneNumber, openStatus, storeNumber) => {
    var html = ` 
    <div class="store-info-window">
        <div class="store-info-name">
            ${name} 
        </div>
        <div class="store-info-openStatus">
            ${openStatus}
        </div>
        <div class="store-info-address">
            <div class="icon">
                <i class="fas fa-location-arrow"></i>
            </div>
            <span>${address}</span>
        </div>
        <div class="store-info-phoneNumber">
            <div class="icon">
                <i class="fas fa-phone-alt"></i>
            </div>
            <span>
                <a href="tel:${phoneNumber}">${phoneNumber}</a>
            </span>
        </div>
    </div>`;
    let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        label: `${storeNumber + 1}`
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        document.getElementById(`${clickedStore}`).classList.remove("marker-click");
        document.getElementById(`${storeNumber}`).classList.add("marker-click");
        document.getElementById(`${storeNumber}`).focus({ preventScroll: false });

        clickedStore = storeNumber;
    });
    markers.push(marker);
}




const getStores = () => {
    const zipCode = document.getElementById("zip-code").value;
    if (!zipCode) {
        return
    }
    const API_URL = `https://be-for-store-locator.herokuapp.com/api/stores?zip_code=${zipCode}`;
    fetch(API_URL)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        }).then((data) => {
            if (data.length > 0) {
                clearLocations();
                searchLocationsNear(data);
                fillStoresContainer(data);
                setOnClickListener();
            } else {
                clearLocations();
                noStoresFound();
            }

        })
}

const searchLocationsNear = (stores) => {
    let bounds = new google.maps.LatLngBounds();
    stores.forEach((store, index) => {
        let latlng = new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]);
        let name = store.storeName;
        let address = store.addressLines[0];
        let phoneNumber = store.phoneNumber;
        let openStatus = store.openStatusText;
        createMarker(latlng, name, address, phoneNumber, openStatus, index);
        bounds.extend(latlng);

    });
    map.fitBounds(bounds);

}


const fillStoresContainer = (stores) => {
    let storeHtml = '';
    stores.forEach((store, index) => {

        let address1 = store.addressLines[0];
        let address2 = store.addressLines[1];
        let phoneNumber = store.phoneNumber;

        // storeContainer.setAttribute("class", "stores-list")
        storeHtml += `
            <div class="store-container" id=${index} tabindex="0">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address1}</span>
                            <span>${address2}</span>
                        </div>
                        <div class="store-phone-number">${phoneNumber}</div> 
                    </div>
                    <div class="store-number-container"> 
                        <div class="store-number">${index + 1}</div>
                    </div>
                </div>
            </div>     `
        document.querySelector(".stores-list").innerHTML = storeHtml;


    })
}