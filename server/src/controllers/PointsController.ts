import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{
    async index(request: Request, response: Response){
        // cidade, uf, items - Query Params
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct() // para nao repetir pontos que possam tem mais de um item na selecao
        .select('points.*'); // quero retornar so valores da tebela points e nao da com join

        return response.json(points);
    }

    async create(request: Request, response: Response) {
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
    
        const point = {
            image: 'image-teste',
            name, // sem short sintexe
            email,
            whatsapp,
            latitue,
            longitude,
            city,
            uf,
        }

        // short sintaxe
        const insertedIds = await trx('points').insert(point);
    
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

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point,
        });
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({ point, items });
    }
}

export default PointsController;