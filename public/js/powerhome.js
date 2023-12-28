// http://localhost:3000/powerhome?year=2020&month=01&metroCd=11&cityCd=26&bizCd=C

const express = require("express");
const https = require("https");
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); // body-parser 모듈을 추가합니다.

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // express 앱이 body-parser를 사용하도록 설정합니다.

app.get("/powerhome", function (req, res) {
    const apiKey = process.env.API_KEY;
    const year = req.body.year; // 사용자가 선택한 '연도' 값을 받습니다.
    const month = req.body.month; // 사용자가 선택한 '월' 값을 받습니다.
    const metroCd = req.body.metroCd; // 사용자가 선택한 '시도 코드' 값을 받습니다.
    const cityCd = req.body.cityCd; // 사용자가 선택한 '시군구 코드' 값을 받습니다.
    const cntrCd = req.body.cntrCd; // 사용자가 선택한 '업종 코드' 값을 받습니다.
    const returnType = 'json';

    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/industryType.do?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&cntrCd=${cntrCd}&apiKey=${apiKey}&returnType=${returnType}`;

    https.get(apiUrl, function (apiRes) {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            console.log(data);
            res.send(data);
        });

    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
});


app.listen(3000, function () {
    console.log("Server is running at port 3000...");
});