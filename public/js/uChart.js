const upowerData = {
    1955: 0,
    1956: 0,
    1957: 139,
    1958: 173,
    1959: 140,
    1960: 141,
    1961: 46,
    1962: 55,
    1963: 62,
    1964: 73,
    1965: 86,
    1966: 102,
    1967: 130,
    1968: 157,
    1969: 202,
    1970: 240,
    1971: 270,
    1972: 298,
    1973: 363,
    1974: 405,
    1975: 471,
    1976: 547,
    1977: 627,
    1978: 739,
    1979: 830,
    1980: 859,
    1981: 915,
    1982: 963,
    1983: 1068,
    1984: 1164,
    1985: 1243,
    1986: 1367,
    1987: 1543,
    1988: 1771,
    1989: 1939,
    1990: 2202,
    1991: 2412,
    1992: 2639,
    1993: 2899,
    1994: 3297,
    1995: 3640,
    1996: 4006,
    1997: 4366,
    1998: 4167,
    1999: 4572,
    2000: 5066.853,
    2001: 5443.917,
    2002: 5844.954,
    2003: 6126.182,
    2004: 6491,
    2005: 6883,
    2006: 7191,
    2007: 7607,
    2008: 7922.148,
    2009: 8092.336,
    2010: 8883.158,
    2011: 9141.731,
    2012: 9331.03,
    2013: 9285.001878,
    2014: 9305,
    2015: 9555.177,
    2016: 9699,
    2017: 9869,
    2018: 10195,
    2019: 10039,
    2020: 9826,
    2021: 10330.037,
    2022: 10652.0798,
    2023: 9773.255678,
    2024: 9951.633249,
    2025: 10130.01082,
    2026: 10308.38839,
    2027: 10486.76596,
    2028: 10665.14353,
    2029: 10843.5211,
    2030: 11021.89867,
    2031: 11200.27625,
    2032: 11378.65382,
    2033: 11557.03139,
    2034: 11735.40896,
    2035: 11913.78653,
    2036: 12092.1641,
    2037: 12270.54167,
    2038: 12448.91924,
    2039: 12627.29681,
    2040: 12805.67438,
    2041: 12984.05195,
    2042: 13162.42953,
    2043: 13340.8071,
    2044: 13519.18467,
    2045: 13697.56224,
    2046: 13875.93981,
    2047: 14054.31738,
    2048: 14232.69495,
    2049: 14411.07252,
    2050: 14589.45009,
    2051: 14767.82766,
    2052: 14946.20523,
    2053: 15124.58281,
    2054: 15302.96038,
    2055: 15481.33795,
    2056: 15659.71552,
    2057: 15838.09309,
    2058: 16016.47066,
    2059: 16194.84823,
    2060: 16373.2258,
    2061: 16551.60337,
    2062: 16729.98094,
    2063: 16908.35852,
    2064: 17086.73609,
    2065: 17265.11366,
    2066: 17443.49123,
    2067: 17621.8688,
    2068: 17800.24637,
    2069: 17978.62394,
    2070: 18157.00151
};


const useChartData = {
    labels: Object.keys(upowerData),
    datasets: [{
        label: '1인당 전력 사용량 (kWh/명)',
        data: Object.values(upowerData),
        backgroundColor: Object.keys(upowerData).map(() => 'lightgrey'), // 기본 색상으로 배열 채우기
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const useConfig = {
    type: 'bar',
    data: useChartData,
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: '전력 소비량 그래프'
            }
        }
    }
};

const useCtx = document.getElementById('useChart').getContext('2d');
const useChart = new Chart(useCtx, useConfig);

function updateUseChart(year) {
    let color;
    if (year < 2025) {
        color = 'red';
    } else if (year < 2030) {
        color = 'blue';
    } else {
        color = 'green';
    }

    let use = upowerData[year];
    if (use === undefined) {
        alert(year + "년도의 데이터는 아직 준비되지 않았습니다.");
    } else {
        // 현재 연도가 labels 배열에 있는 위치를 찾습니다. 
        let index = useChart.data.labels.indexOf(year.toString());
        if (index === -1) {
            // 연도가 아직 labels 배열에 없다면, 연도와 데이터, 색상을 추가합니다.
            useChart.data.labels.push(year.toString());
            useChart.data.datasets[0].data.push(use);
            useChart.data.datasets[0].backgroundColor.push(color);
        } else {
            // 연도가 이미 labels 배열에 있다면, 해당 위치의 데이터와 색상만 변경합니다.
            useChart.data.datasets[0].data[index] = use;
            useChart.data.datasets[0].backgroundColor[index] = color;
        }
        useChart.update();
    }
}










// function updateChart() {
//     // 사용자 입력 연도 가져오기
//     const inputYear = document.getElementById('powerprice-yearInput').value;

//     // 연도에 해당하는 데이터 가져오기
//     const inputData = powerData[inputYear];

//     // 차트 데이터 초기화
//     priceChartData.labels = [];
//     priceChartData.datasets[0].data = [];

//     // 차트 데이터 업데이트
//     priceChartData.labels.push(inputYear);
//     priceChartData.datasets[0].data.push(inputData);

//     // 차트 업데이트
//     priceChart.update();
// }




// const config = {
//     type: 'line',
//     data: powerData,
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Chart.js Line Chart'
//             }
//         }
//     },
// };