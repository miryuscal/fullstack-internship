const express = require('express');
const cors = require('cors');
const products = require('./products.json');
const { default: axios } = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('🎉 Express server is online');
});

const productsData = require('./products.json');

app.get('/products', async (req, res) => {
    try{
        const response = await axios.get('https://data-asg.goldprice.org/dbXRates/USD', {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });

        const ouncePrice = response.data.items[0].xauPrice;
        const goldPricePerGram = ouncePrice / 31.1035;

        const productsWithPrice = productsData.map(product => {
            const price = (product.popularityScore + 1) * product.weight * goldPricePerGram;
            return {
                ...product,
                price: price.toFixed(2) + " USD"
            };
        });

        res.json(productsWithPrice);
    } catch (error) {
        console.error('Gold price couldnt get', error.message);
        res.status(500).json({ error: 'Gold price couldnt get'});
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is online: http://localhost:${PORT}`);
});
