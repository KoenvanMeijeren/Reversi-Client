Game.Stats = (function () {
    /**
     * Initializes the game statistics module.
     *
     * @param {string} parentSelector
     *   The selector of the parent.
     * @param {GameStatistics} gameStatistics
     *   The game statistics.
     */
    function init (parentSelector, gameStatistics) {
        const parent = $(parentSelector);

        parent.html('');
        parent.append(Reversi.templates.gameFichesStatistics());

        const canvas = document.getElementById('gameFichesStatistics').getContext('2d');
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Zwart', 'Wit',],
                datasets: [{
                    label: '# van fiches',
                    data: [gameStatistics.BlackFiches, gameStatistics.WhiteFiches],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return {
        init
    };
})();
