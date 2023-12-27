const express = require("express");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/powerhome", function (req, res) {

    const apiKey = process.env.API_KEY;
    const year = '2020';
    const month = '11';
    const metroCd = '11';
    const cityCd = '11';
    const bizCd = 'C';
    const returnType = 'json';

    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/industryType.do?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&bizCd=${bizCd}&apiKey=${apiKey}&returnType=${returnType}`;

    https.get(apiUrl, function (apiRes) {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });

    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
});

app.listen(3000, function () {
    console.log("Server is running at port 3000...");
});




