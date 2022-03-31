Game.Stats = (function () {

    /**
     * The state map of the statistics.
     *
     * @type {{previousStatistics: null|GameStatistics, statistics: null|GameStatistics}}
     */
    const stateMap = {
        statistics: null,
        previousStatistics: null
    };

    /**
     * Initializes the game statistics module.
     *
     * @param {string} parentSelector
     *   The selector of the parent.
     * @param {GameStatistics} gameStatistics
     *   The game statistics.
     */
    function init (parentSelector, gameStatistics) {
        // Only true when this module is initialized, afterwards it already has a default state.
        stateMap.statistics = gameStatistics;

        // Updates the previous statistics if the current statistics are different.
        if (statisticsHasChanged()) {
            stateMap.previousStatistics = gameStatistics;
            console.log('changed');

            render(parentSelector);
        }
    }

    /**
     * Determines if the statistics has changed.
     *
     * @return {boolean}
     *   The statistics.
     */
    function statisticsHasChanged () {
        if (stateMap.previousStatistics == null) {
            return true;
        }

        return stateMap.statistics.isEqual(stateMap.previousStatistics);
    }

    /**
     * Renders the game statistics.
     *
     * @param {string} parentSelector
     *   The selector of the parent.
     */
    function render (parentSelector) {
        const parent = $(parentSelector);
        parent.html('');
        parent.append(Reversi.templates.gameStatistics());

        createFichesStatisticsChart();
        createConqueredFichesStatistics();
    }

    /**
     * Creates the chart for the statistics of the fiches.
     */
    function createFichesStatisticsChart () {
        const statistics = get();
        const canvas = document.getElementById('gameFichesStatistics').getContext('2d');

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Zwart', 'Wit',],
                datasets: [{
                    label: '# stenen',
                    data: [statistics.BlackFiches, statistics.WhiteFiches],
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

    /**
     * Creates the chart for the statistics of the taken fiches.
     */
    function createConqueredFichesStatistics () {
        const statistics = get();
        const canvas = document.getElementById('gameConqueredFichesStatistics').getContext('2d');

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Zwart', 'Wit',],
                datasets: [{
                    label: '# veroverde stenen',
                    data: [statistics.ConqueredBlackFiches, statistics.ConqueredWhiteFiches],
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

    /**
     * Gets the statistics.
     *
     * @return {GameStatistics}
     *   The statistics.
     */
    function get () {
        return stateMap.statistics;
    }

    return {
        init,
        render,
        get
    };
})();
