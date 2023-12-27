const powerData = {
  1955: 3,
  1956: 3,
  1957: 8,
  1958: 8,
  1959: 8,
  1960: 8,
  1961: 3.22,
  1962: 3.47,
  1963: 3.28,
  1964: 3.68,
  1965: 4.72,
  1966: 5.37,
  1967: 5.57,
  1968: 6.04,
  1969: 5.86,
  1970: 6.34,
  1971: 6.41,
  1972: 7.36,
  1973: 7.3,
  1974: 10.64,
  1975: 17.1,
  1976: 19.43,
  1977: 21.81,
  1978: 22.38,
  1979: 32.17,
  1980: 50.88,
  1981: 64.31,
  1982: 69.87,
  1983: 67.71,
  1984: 67.42,
  1985: 67.92,
  1986: 65.51,
  1987: 63.48,
  1988: 59.49,
  1989: 55.43,
  1990: 52.94,
  1991: 54.23,
  1992: 58.09,
  1993: 58.9,
  1994: 60.22,
  1995: 61.28,
  1996: 62.99,
  1997: 65.26,
  1998: 72.08,
  1999: 71.59,
  2000: 74.65,
  2001: 77.06,
  2002: 73.88,
  2003: 74.68,
  2004: 74.58,
  2005: 74.46,
  2006: 76.43,
  2007: 77.85,
  2008: 78.76,
  2009: 83.59,
  2010: 86.12,
  2011: 89.32,
  2012: 99.1,
  2013: 106.33,
  2014: 111.28,
  2015: 111.575,
  2016: 111.234,
  2017: 109.531,
  2018: 108.748,
  2019: 108.658,
  2020: 109.8,
  2021: 108.11,
  2022: 120.507,
  2023: 116.4880079,
  2024: 118.3188611,
  2025: 120.1497142,
  2026: 121.9805674,
  2027: 123.8114206,
  2028: 125.6422738,
  2029: 127.4731269,
  2030: 129.3039801,
  2031: 131.1348333,
  2032: 132.9656864,
  2033: 134.7965396,
  2034: 136.6273928,
  2035: 138.4582459,
  2036: 140.2890991,
  2037: 142.1199523,
  2038: 143.9508055,
  2039: 145.7816586,
  2040: 147.6125118,
  2041: 149.443365,
  2042: 151.2742181,
  2043: 153.1050713,
  2044: 154.9359245,
  2045: 156.7667776,
  2046: 158.5976308,
  2047: 160.428484,
  2048: 162.2593372,
  2049: 164.0901903,
  2050: 165.9210435,
  2051: 167.7518967,
  2052: 169.5827498,
  2053: 171.413603,
  2054: 173.2444562,
  2055: 175.0753093,
  2056: 176.9061625,
  2057: 178.7370157,
  2058: 180.5678689,
  2059: 182.398722,
  2060: 184.2295752,
  2061: 186.0604284,
  2062: 187.8912815,
  2063: 189.7221347,
  2064: 191.5529879,
  2065: 193.3838411,
  2066: 195.2146942,
  2067: 197.0455474,
  2068: 198.8764006,
  2069: 200.7072537,
  2070: 202.5381069,
};

const priceChartData = {
  labels: Object.keys(powerData),
  datasets: [
    {
      label: "전력 단가 (kWh/원)",
      data: Object.values(powerData),
      backgroundColor: Object.keys(powerData).map(() => "#00000012"), // 기본 색상으로 배열 채우기
      borderColor: "#ce295b9f", // 막대 테두리 색상 설정
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "bar",
  data: priceChartData, // 'powerData'를 'priceChartData'로 변경
  options: {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "전력 가격 그래프",
      },
    },
  },
};

// Canvas 요소 가져오기
const ctx = document.getElementById("priceChart").getContext("2d");

// Chart 생성
const priceChart = new Chart(ctx, config);

function updateChart(year) {
  let color;
  if (year < 2022) {
    color = "red";
  } else if (year < 2030) {
    color = "blue";
  } else {
    color = "green";
  }

  let price = powerPriceData[year];
  if (price === undefined) {
    alert(year + "년도의 데이터는 아직 준비되지 않았습니다.");
  } else {
    // 현재 연도가 labels 배열에 있는 위치를 찾습니다.
    let index = priceChart.data.labels.indexOf(year.toString());
    if (index === -1) {
      // 연도가 아직 labels 배열에 없다면, 연도와 데이터, 색상을 추가합니다.
      priceChart.data.labels.push(year.toString());
      priceChart.data.datasets[0].data.push(price);
      priceChart.data.datasets[0].backgroundColor.push(color);
    } else {
      // 연도가 이미 labels 배열에 있다면, 해당 위치의 데이터와 색상만 변경합니다.
      priceChart.data.datasets[0].data[index] = price;
      priceChart.data.datasets[0].backgroundColor[index] = color;
    }
    priceChart.update();
  }
}

