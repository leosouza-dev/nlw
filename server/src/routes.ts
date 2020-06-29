import express, { response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    // select * from items 
    // como demora um pouco, usar await
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        }
    });

    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    // desestruturação
    const {
        name,
        email,
        whatsapp,
        latitue,
        longitude,
        city,
        uf,
        items // que vem do relacionamento
    } = request.body;

    // short sintaxe
    await knex('points').insert({
        image: 'image-teste',
        name, // sem short sintexe
        email,
        whatsapp,
        latitue,
        longitude,
        city,
        uf,
    });

    return response.json({ success: true });
});

export default routes;