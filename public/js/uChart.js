import { powerConsumptionData } from './powerConsumptionData.js';


const useChartData = {
    labels: Object.keys(powerConsumptionData),
    datasets: [{
        label: '1인당 전력 사용량 (kWh/명)',
        data: Object.values(powerConsumptionData),
        backgroundColor: Object.keys(powerConsumptionData).map(() => "rgba(0, 0, 0, 0.07)"), // 기본 색상으로 배열 채우기
        borderColor: 'rgba(239, 184, 6)',
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

window.updateUseChart = function (year) {
    let color;
    if (year < 2022) {
        color = 'red';
    } else if (year < 2040) {
        color = 'blue';
    } else {
        color = 'green';
    }

    let use = powerConsumptionData[year];
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