const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {title: 'minha aplicação express'});
});

app.get('/sobre', (req, res) => {
    res.render('index', {title: 'Sobre Nós'});
});

app.listen(port, () => {
    console.log('servidor rodando em http://localhost:${port}');
});