import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    // select * from items 
    // como demora um pouco, usar await
    const items = await knex('items').select('*');

    return response.json(items);
});

export default routes;