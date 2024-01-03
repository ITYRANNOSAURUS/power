import { powerNewRData, powerReRData, powerSumData } from './powerNewRData.js';

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
        },
        {
            data: Object.values(powerSumData),
            label: "신재생에너지",
            borderColor: "#8e5ea2",
            fill: false
        }
    ]
};

const rnCtx = document.getElementById('rnChart').getContext('2d');
const rnChart = new Chart(rnCtx, {
    type: 'line',
    data: chartData,
    options: {
        title: {
            display: true,
            text: '신재생에너지 공급 비중'
        }
    }
});

window.updateRnChart = function (year) {
    let newColor, reColor;

    // 색상 결정 로직
    if (year < 2022) {
        newColor = 'red';
        reColor = 'red';
    } else if (year < 2040) {
        newColor = 'blue';
        reColor = 'blue';
    } else {
        newColor = 'green';
        reColor = 'green';
    }

    // 신에너지 데이터 업데이트
    let newEnergy = powerNewRData[year];
    if (newEnergy === undefined) {
        alert(year + "년도의 신에너지 데이터는 아직 준비되지 않았습니다.");
    } else {
        updateChartData(rnChart, year, newEnergy, newColor, 0);
    }

    // 재생에너지 데이터 업데이트
    let reEnergy = powerReRData[year];
    if (reEnergy === undefined) {
        alert(year + "년도의 재생에너지 데이터는 아직 준비되지 않았습니다.");
    } else {
        updateChartData(rnChart, year, reEnergy, reColor, 1);
    }
}

// 차트 데이터 업데이트 함수
function updateChartData(chart, year, data, color, datasetIndex) {
    let index = chart.data.labels.indexOf(year.toString());

    // borderColor 배열이 없다면 초기화합니다.
    if (!chart.data.datasets[datasetIndex].pointBorderColor) {
        chart.data.datasets[datasetIndex].pointBorderColor = [];
    }

    if (index === -1) {
        // 새로운 연도 데이터를 추가합니다.
        chart.data.labels.push(year.toString());
        chart.data.datasets[datasetIndex].data.push(data);

        // 해당 연도의 데이터 포인트에 대한 색상을 설정합니다.
        chart.data.datasets[datasetIndex].pointBorderColor.push(color);
    } else {
        // 기존 연도의 데이터를 업데이트합니다.
        chart.data.datasets[datasetIndex].data[index] = data;

        // 해당 연도의 데이터 포인트 색상만 업데이트합니다.
        chart.data.datasets[datasetIndex].pointBorderColor[index] = color;
    }

    // 차트를 업데이트합니다.
    chart.update();
}
