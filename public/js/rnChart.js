import { powerNewRData, powerReRData } from './powerNewRData.js';

// 데이터를 Chart.js 형식으로 변환
const chartData = {
    labels: Object.keys(powerNewRData),
    datasets: [
        {
            data: Object.values(powerNewRData),
            label: "에너지",
            borderColor: "#3e95cd",
            fill: false
        },
        {
            data: Object.values(powerReRData),
            label: "재생에너지",
            borderColor: "#8e5ea2",
            fill: false
        }
    ]
};

// 차트 생성
new Chart(document.getElementById("rnChart"), {
    type: 'line',
    data: chartData,
    options: {
        title: {
            display: true,
            text: '에너지 및 재생에너지 변화 (in GW)'
        }
    }
});
