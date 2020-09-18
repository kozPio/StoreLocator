const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;
const Store = require('./api/models/store');
const GoogleMapsService = require('./api/services/googleMapsService');
const googleMapsService = new GoogleMapsService();
require('dotenv').config();



mongoose.connect(`mongodb+srv://peter_project:${process.env.DB__PASSWORD}@cluster0.9osri.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});




app.use(express.json({
    limit: '50mb'
}))



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')

    next();
})

app.post('/api/stores', (req, res) => {
    let dbStores = []
    let stores = req.body;
    stores.forEach((store) => {
        dbStores.push({
            storeName: store.name,
            phoneNumber: store.phoneNumber,
            address: store.address,
            openStatusText: store.openStatusText,
            addressLines: store.addressLines,
            location: {
                type: 'Point',
                coordinates: [
                    store.coordinates.longitude,
                    store.coordinates.latitude
                ]
            }
        })
    });
    // Store.create(dbStores, (err, stores) => {
    //     if (err) {
    //         res.status('500').send(err);
    //     } else {
    //         res.status('200').send(stores);
    //     }
    // })

    res.status('200').send(stores);


})

app.get('/api/stores/', (req, res) => {
    const zipCode = req.query.zip_code;

    googleMapsService.getCoordinates(zipCode).then((coordinates) => {
        Store.find({
            location: {
                $near: {
                    $maxDistance: 4828,
                    $geometry: {
                        type: "Piont",
                        coordinates: coordinates
                    }
                }
            }
        }, (err, stores) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(stores);
            }
        })
    }).catch((error) => {
        console.log(error)
    })


})

app.get('/', (req, res) => res.send('Hello World'))

// app.delete('/api/stores', (req, res) => {
//     Store.deleteMany({}, (err) => {
//         res.status(200).send(err);
//     })
// })







app.listen(port, () => console.log(`App listing at http://localhost:${port}`))