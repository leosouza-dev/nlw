import express from 'express';

const app = express();

app.get('/users', () => {
    console.log('listagem de usuários');
    
});

app.listen(3333);

//npx ts-node src/server.ts   