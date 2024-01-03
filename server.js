const path = require('path');
const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'power.html'));
});

app.get('/powerprice', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powerprice.html'));
});

app.get('/poweruse', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'poweruse.html'));
});

app.get('/powerdep', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powerdep.html'));
});

app.get('/powernew', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powernew.html'));
});



app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 시작되었습니다.');
});
