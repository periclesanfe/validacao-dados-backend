const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar EJS como engine de visualização
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Lista de DDDs válidos no Brasil (todos os DDDs existentes)
const validDDDs = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];

// Função para validar datas
function isValidDate(d, m, y) {
    // Certificar-se de que dia, mês e ano sejam números
    d = parseInt(d, 10);
    m = parseInt(m, 10);
    y = parseInt(y, 10);

    // Checar se a data é válida
    const date = new Date(y, m - 1, d); // Subtrair 1 do mês, pois janeiro é 0 em JavaScript
    return date && (date.getDate() === d) && (date.getMonth() + 1) === m && date.getFullYear() === y;
}

// Função para validar emails
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Rota principal que exibe o formulário
app.get('/', (req, res) => {
    res.render('index', { title: 'Formulário de Pré-Matrícula', message: null });
});

// Rota para processar o envio do formulário
app.post('/enviar', (req, res) => {
    const { nomeAluno, dia, mes, ano, nomeMae, nomePai, ddd, telefone, email, serie, turno, atividades } = req.body;

    let errors = [];

    // Validação dos campos obrigatórios
    if (!nomeAluno || !dia || !mes || !ano || !nomeMae || !nomePai || !ddd || !telefone || !email || !serie || !turno) {
        errors.push('Todos os campos obrigatórios devem ser preenchidos.');
    }

    // Validação de data de nascimento
    if (!isValidDate(dia, mes, ano)) {
        errors.push('Data de nascimento inválida.');
    }

    // Validação de email
    if (!isValidEmail(email)) {
        errors.push('E-mail inválido.');
    }

    // Validação de DDD
    if (!validDDDs.includes(ddd)) {
        errors.push('DDD inválido.');
    }

    // Validação das atividades extracurriculares (no máximo 3)
    if (atividades && atividades.length > 3) {
        errors.push('Você só pode selecionar até 3 atividades extracurriculares.');
    }

    // Enviar resposta com base nas validações
    if (errors.length > 0) {
        res.render('index', { title: 'Formulário de Pré-Matrícula', message: errors.join('<br>') });
    } else {
        res.render('index', { title: 'Formulário de Pré-Matrícula', message: 'Cadastro realizado com sucesso!' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
