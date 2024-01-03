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
            text: '신재생에너지 공급'
        }
    }
});

window.updateRnChart = function (year) {
    let newColor, reColor, sumColor;

    // 색상 결정 로직
    if (year < 2022) {
        newColor = 'red';
        reColor = 'red';
        sumColor = 'red';
    } else if (year < 2040) {
        newColor = 'blue';
        reColor = 'blue';
        sumColor = 'blue';
    } else {
        newColor = 'green';
        reColor = 'green';
        sumColor = 'green';
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

    // 신재생에너지 데이터 업데이트
    let sumEnergy = powerSumData[year];
    if (sumEnergy === undefined) {
        alert(year + "년도의 신재생에너지 데이터는 아직 준비되지 않았습니다.");
    } else {
        updateChartData(rnChart, year, sumEnergy, sumColor, 2);
    }
}

// 차트 데이터 업데이트 함수
function updateChartData(chart, year, data, color, datasetIndex) {
    let index = chart.data.labels.indexOf(year.toString());

    // pointBorderColor가 배열이 아니라면, 데이터셋 크기만큼 새 배열을 생성하고 기본 색상으로 채웁니다.
    if (!Array.isArray(chart.data.datasets[datasetIndex].pointBorderColor)) {
        chart.data.datasets[datasetIndex].pointBorderColor = new Array(chart.data.datasets[datasetIndex].data.length).fill(chart.data.datasets[datasetIndex].borderColor);
    }

    // pointBackgroundColor가 배열이 아니라면, 데이터셋 크기만큼 새 배열을 생성하고 기본 색상으로 채웁니다.
    if (!Array.isArray(chart.data.datasets[datasetIndex].pointBackgroundColor)) {
        chart.data.datasets[datasetIndex].pointBackgroundColor = new Array(chart.data.datasets[datasetIndex].data.length).fill(chart.data.datasets[datasetIndex].backgroundColor);
    }

    if (index === -1) {
        // 새로운 연도 데이터를 추가합니다.
        chart.data.labels.push(year.toString());
        chart.data.datasets[datasetIndex].data.push(data);
        chart.data.datasets[datasetIndex].pointBorderColor.push(color);
        chart.data.datasets[datasetIndex].pointBackgroundColor.push(color);
    } else {
        // 기존 연도의 데이터를 업데이트합니다.
        chart.data.datasets[datasetIndex].data[index] = data;
        chart.data.datasets[datasetIndex].pointBorderColor[index] = color;
        chart.data.datasets[datasetIndex].pointBackgroundColor[index] = color;
    }

    // 차트를 업데이트합니다.
    chart.update();
}
