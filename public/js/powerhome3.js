const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // JSON 데이터를 처리할 수 있도록 추가합니다.

app.post("/powerhome", function (req, res) { // app.get 대신 app.post를 사용해 POST 요청을 처리합니다.
    const apiKey = process.env.API_KEY;
    const year = req.body.year;
    const month = req.body.month;
    const metroCd = req.body.metroCd;
    const cityCd = req.body.cityCd;
    const cntrCd = req.body.cntrCd;
    const returnType = 'json';

    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/industryType.do?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&cntrCd=${cntrCd}&apiKey=${apiKey}&returnType=${returnType}`;

    https.get(apiUrl, function (apiRes) {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });

    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
});


app.listen(3000, function () {
    console.log("Server is running at port 3000...");
});
