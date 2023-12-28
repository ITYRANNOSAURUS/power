document.querySelector('#powerhomeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const metroCd = document.getElementById('metroCd').value;
    const cityCd = document.getElementById('cityCd').value;
    const cntrCd = document.getElementById('cntrCd').value;

    fetch(`/powerhome?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&cntrCd=${cntrCd}`)
        .then(response => {
            // 응답 본문을 텍스트로 출력
            response.text().then(text => {
                console.log(text);
            });

            // JSON 형식일 경우 다음 단계로 이동
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error('Error: ', err));

});
