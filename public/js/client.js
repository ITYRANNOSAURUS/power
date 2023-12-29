document.querySelector('#powerhomeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const metroCd = document.getElementById('metroCd').value;
    const cityCd = document.getElementById('cityCd').value;
    const cntrCd = document.getElementById('cntrCd').value;

    fetch(`/powerhome?year=${year}&month=${month}&metroCd=${metroCd}&cityCd=${cityCd}&cntrCd=${cntrCd}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error('Error: ', err));
});
