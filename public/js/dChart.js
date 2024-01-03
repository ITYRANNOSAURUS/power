// dChart.js
import { powerDepData } from './powerDepData.js';

const depChartData = {
  labels: Object.keys(powerDepData),
  datasets: [
    {
      label: "에너지 수입의존도 (%)",
      data: Object.values(powerDepData),
      backgroundColor: Object.keys(powerDepData).map(() => "rgba(0, 0, 0, 0.07)"), // 기본 색상으로 배열 채우기
      borderColor: "rgba(36, 140, 214, 0.459)", // 막대 테두리 색상 설정
      borderWidth: 1,
    },
  ],
};

const depConfig = {
  type: "bar",
  data: depChartData, // 'powerPriceData'를 'depChartData'로 변경
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
const depCtx = document.getElementById("depChart").getContext("2d");

// Chart 생성
const depChart = new Chart(depCtx, depConfig);

window.updateDepChart = function (year) {
  let color;
  if (year < 2022) {
    color = "red";
  } else if (year < 2040) {
    color = "blue";
  } else {
    color = "green";
  }

  let dep = powerDepData[year];
  if (dep === undefined) {
    alert(year + "년도의 데이터는 아직 준비되지 않았습니다.");
  } else {
    // 현재 연도가 labels 배열에 있는 위치를 찾습니다.
    let index = depChart.data.labels.indexOf(year.toString());
    if (index === -1) {
      // 연도가 아직 labels 배열에 없다면, 연도와 데이터, 색상을 추가합니다.
      depChart.data.labels.push(year.toString());
      depChart.data.datasets[0].data.push(dep);
      depChart.data.datasets[0].backgroundColor.push(color);
    } else {
      // 연도가 이미 labels 배열에 있다면, 해당 위치의 데이터와 색상만 변경합니다.
      depChart.data.datasets[0].data[index] = dep;
      depChart.data.datasets[0].backgroundColor[index] = color;
    }
    depChart.update();
  }
}

