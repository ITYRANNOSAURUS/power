const express = require('express');
const path = require('path');

const app = express();

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

app.get('/powerhome', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'powerhome.html'));
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 시작되었습니다.');
});
