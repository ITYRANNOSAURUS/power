const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

async function getPowerData(year, month, metroCd, cityCd, bizCd, returnType) {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/industryType.do?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&bizCd=${bizCd}&apiKey=${apiKey}&returnType=${returnType}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
        return null;
    }
}

module.exports = getPowerData;
