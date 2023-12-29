const path = require('path');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const getPowerData = require('./powerhome');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'power.html'));
});

app.get('/powerprice', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powerprice.html'));
});

app.get('/poweruse', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'poweruse.html'));
});

app.get('/powerhome', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powerhome.html'));
});

app.post('/powerhome', async (req, res) => {
    const { year, month, metroCd, cityCd, bizCd, returnType } = req.body;
    const data = await getPowerData(year, month, metroCd, cityCd, bizCd, returnType);

    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ message: '서버에서 에러가 발생했습니다.' });
    }
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 시작되었습니다.');
});
