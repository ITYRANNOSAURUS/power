import { powerConsumptionData } from './powerConsumptionData.js';


window.getPowerConsumption = function () {
    let year = document.getElementById('poweruse-yearInput').value;
    let consumption = powerConsumptionData[year];

    if (consumption === undefined) {
        document.getElementById('poweruse-result').innerText = year + "년도의 데이터는 아직 준비되지 않았습니다.";
    } else {
        let baseYear = 2022;
        let baseConsumption = powerConsumptionData[baseYear];
        let increaseRate = ((consumption - baseConsumption) / baseConsumption * 100).toFixed(2);
        document.getElementById('poweruse-result').innerText = year + "년의 예상 소비전력량은 " + consumption +
            " kWh/명으로, " + baseYear + "년 대비 " + increaseRate + "% 상승합니다.";
        updateUseChart(year);
    }
}