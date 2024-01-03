import { powerSumData } from './powerNewRData.js';

window.updateYearInput = function () {
    var yearInput = document.getElementById("powersum-yearInput");
    var yearDropdown = document.getElementById("year-dropdown");

    // 선택한 연도를 입력 창에 설정
    yearInput.value = yearDropdown.value;
}

window.onload = function () {
    document.getElementById("powersum-yearInput")
        .addEventListener("keydown", window.handleKeyPress);
};

window.handleKeyPress = function (event) {
    // 엔터 키를 눌렀을 때
    if (event.key === "Enter") {
        getPowerSum();
    }
}

window.toggleYearDropdown = function () {
    var yearDropdown = document.getElementById("year-dropdown");

    // 토글 로직만 수행
    yearDropdown.style.display =
        yearDropdown.style.display === "none" ? "block" : "none";
}

window.getPowerSum = function () {
    let year = document.getElementById("powersum-yearInput").value;

    // 빈 칸 체크
    if (year.trim() === "") {
        document.getElementById("powersum-result").innerText = "연도를 입력해 주세요.";
        return;
    }

    let consumption = powerSumData[year];

    if (consumption === undefined) {
        document.getElementById("powersum-result").innerText =
            year + "년의 데이터는 아직 준비되지 않았습니다.";
    } else {
        let baseYear = 2021;
        let baseConsumption = powerSumData[baseYear];
        let increaseRate = (((consumption - baseConsumption) / baseConsumption) * 100).toFixed(2);

        if (year >= 2005 && year <= 2022) {
            let consumptionComparison =
                increaseRate > 0 ? "많은 공급 비중입니다." : "적은 공급 비중입니다.";

            document.getElementById("powersum-result").innerText =
                year +
                "년의 신재생에너지 공급 비중은 " +
                consumption +
                " (%)으로, " +
                baseYear +
                "년 대비 " +
                Math.abs(increaseRate) +
                "% " +
                consumptionComparison;
        } else {
            document.getElementById("powersum-result").innerText =
                year +
                "년의 신재생에너지 공급 비중은 " +
                consumption +
                " (%)으로, " +
                baseYear +
                "년 대비 " +
                increaseRate +
                "% 상승합니다.";
        }
        updateRnChart(year);
    }
}
