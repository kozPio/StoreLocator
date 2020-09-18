# Store Locator webapp

Simple App that is created with java Script MongoDB express and Google Maps APi

There is a single page that loads Google Map and a searchbar with Store containers underneath You put in ZiP in the searchbar 

Store Locator zip_codes that are available (Included in the DB)

89164, 89146, 89128 Las Vegas
90048, 90038, 90034 Los Angeles
94203, 94204, 94229, Sacramento


Api for this App uses googles geoLocation APi to convert zip code into lat long cordinates for our map and then Api searches for stores in 3 miles radius from the coordinates we got from that zip code.THen shows them in the store container with information like phone number specific location and alos shows the markers for those places on the map. You can click every store on the map and you will be shown the info window for that store with basic information like when it's open and phone number etc.., you can also clik on the store of your choosinhg in the store container and the info window for that store will be shown above the marker it coresponds to.

MongoDB password was hiden for securyty resons but if you want you can connect your MongoDb and use sample data from store-locator-backend/store-data.json (it's the data for Sacramento so the zip codes above for Sacramento will apply.

# Author and discleimars
Created by Piotr Kozłowski 
This is just a demo presentation of the store Locator and it's use is only for presentational purposes.
