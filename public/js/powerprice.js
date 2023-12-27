import { powerPriceData } from './powerPriceData.js';

window.updateYearInput = function () {
  var yearInput = document.getElementById("powerprice-yearInput");
  var yearDropdown = document.getElementById("year-dropdown");

  // 선택한 연도를 입력 창에 설정
  yearInput.value = yearDropdown.value;
}

window.onload = function () {
  document
    .getElementById("powerprice-yearInput")
    .addEventListener("keydown", handleKeyPress);
};

window.handleKeyPress = function (event) {
  // 엔터 키를 눌렀을 때
  if (event.key === "Enter") {
    getPowerPrice();
  }
}

window.toggleYearDropdown = function () {
  var yearDropdown = document.getElementById("year-dropdown");

  // 토글 로직만 수행
  yearDropdown.style.display =
    yearDropdown.style.display === "none" ? "block" : "none";
}

window.getPowerPrice = function () {
  let year = document.getElementById("powerprice-yearInput").value;
  let price = powerPriceData[year];

  if (price === undefined) {
    document.getElementById("powerprice-result").innerText =
      year + "년의 데이터는 아직 준비되지 않았습니다.";
  } else {
    let baseYear = 2022;
    let basePrice = powerPriceData[baseYear];
    let increaseRate = (((price - basePrice) / basePrice) * 100).toFixed(2);

    if (year >= 1955 && year <= 2022) {
      let priceComparison =
        increaseRate > 0 ? "높은 가격입니다." : "낮은 가격입니다.";

      document.getElementById("powerprice-result").innerText =
        year +
        "년의 전기 단가는 " +
        price +
        " kWh/명으로, " +
        baseYear +
        "년 대비 " +
        Math.abs(increaseRate) +
        "% " +
        priceComparison;
    } else {
      document.getElementById("powerprice-result").innerText =
        year +
        "년의 예상 전기 단가는 " +
        price +
        " kWh/명으로, " +
        baseYear +
        "년 대비 " +
        increaseRate +
        "% 상승합니다.";
    }
    updateChart(year);
  }
}
