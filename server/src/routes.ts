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

    // uma query depende da outra - tratar com transaction
    const trx = await knex.transaction();

    // short sintaxe
    const insertedIds = await trx('points').insert({
        image: 'image-teste',
        name, // sem short sintexe
        email,
        whatsapp,
        latitue,
        longitude,
        city,
        uf,
    });

    const point_id = insertedIds[0];

    //relacionamento
    // percorre os items recebido e devolve um obj com o id item e do point criado
    const pointItems = items.map((item_id: number) => {
        return {
            point_id,
            item_id,
        };
    });

    await trx('point_items').insert(pointItems);

    return response.json({ success: true });
});

export default routes;