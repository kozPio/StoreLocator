const axios = require('axios');

const googleMapsURL = "https://maps.googleapis.com/maps/api/geocode/json";


class GoogleMaps {
    async getCoordinates(zipCode) {
        let coordinates = []
        await axios.get(googleMapsURL, {
            params: {
                address: zipCode,
                key: 'AIzaSyCCdTj36mF2aclV1sNpzRZV-0PCU8ZU9As'
            }

        }).then((response) => {
            const data = response.data;
            coordinates = [
                data.results[0].geometry.location.lng,
                data.results[0].geometry.location.lat
            ]
        }).catch((error) => {
            throw new Error(error);
        });

        return coordinates;
    }
}

module.exports = GoogleMaps;