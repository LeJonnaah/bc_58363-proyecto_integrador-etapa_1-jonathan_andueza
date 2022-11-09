import express from 'express';
import routerProducts from './routers/products.js';
import config from   './config.js';
import Product from './models/liveSearch.js';

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', routerProducts);

app.get('*', (req, res) => {
    res.redirect('/');
});

app.post('/getProducts', async (req, res) => {
    let payload = req.body.payload.trim();
    console.log(payload);
    let search = await Product.find({title: {$regex: new RegExp('^' + payload + '.*', 'i')}}).exec();
    res.send({payload: search});
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));