import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('listagem de usuários');
    response.json([
        'Leonardo',
        'Lari',
        'Chicó',
        'Loki',
        'teste'
    ]);
});

app.listen(3333);

//npx ts-node src/server.ts   