const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'power.html'));
});

app.get('/powerprice', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'powerprice.html'));
});

app.get('/poweruse', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'poweruse.html'));
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 시작되었습니다.');
});
