import express from 'express';
import { AppDataSource } from './database/data-source';
import routes from './routes/index.routes';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import documentation from '../documentation.json';

const app = express();

app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.use(routes);


app.listen(3000, () => {
    console.log('Server running on port 3000');
});

AppDataSource.initialize()
    .then(() => {
        console.log('Databasse inicialized!');
    })
    .catch((error) => console.log(error));
