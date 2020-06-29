import express, { json } from 'express';

const app = express();

const users = [
    'Leonardo',
    'Lari',
    'Chicó',
    'Loki',
    'teste 1'
];

// retorna todos users
app.get('/users', (request, response) => {
    console.log('listagem de usuários');
    return response.json(users);
});

// retorna um user (request param - id)
app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {
    const user = {
        name: 'Leonardo',
        email: `leonardo.rodrigues@caelum.com.br`
    };

    return response.json(user);
});

app.listen(3333);

// npx ts-node src/server.ts   
// npm run dev