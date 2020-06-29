import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{
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

        return response.json(point);
    }
}

export default PointsController;