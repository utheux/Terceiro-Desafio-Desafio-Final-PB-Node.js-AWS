import express from 'express';
import { AppDataSource } from './database/data-source';
import routes from './routes/index.routes'
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });

});





app.listen(3000, () => {
    console.log('Server running on port 3000');
});

AppDataSource.initialize()
    .then(() => {
        console.log('Databasse inicialized!');
    })
    .catch((error) => console.log(error));
