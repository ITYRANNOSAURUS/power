// pChart.js
import { powerPriceData } from './powerPriceData.js';

const priceChartData = {
  labels: Object.keys(powerPriceData),
  datasets: [
    {
      label: "전력 단가 (kWh/원)",
      data: Object.values(powerPriceData),
      backgroundColor: Object.keys(powerPriceData).map(() => "#00000012"), // 기본 색상으로 배열 채우기
      borderColor: "#ce295b9f", // 막대 테두리 색상 설정
      borderWidth: 1,
    },
  ],
};

const config = {
  type: "bar",
  data: priceChartData, // 'powerPriceData'를 'priceChartData'로 변경
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

window.updateChart = function (year) {
  let color;
  if (year < 2022) {
    color = "red";
  } else if (year < 2040) {
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

