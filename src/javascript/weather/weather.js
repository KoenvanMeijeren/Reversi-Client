const Weather = (function () {

    const configMap = {
        url: 'http://api.openweathermap.org/data/2.5/',
        apiKey: 'aa6bb372c0ccba60aff08f3c0b3cf922'
    };

    /**
     * Initializes the weather module.
     *
     * @param {string} parentSelector
     *   The selector of the parent.
     */
    function init (parentSelector) {
        const parent = $(parentSelector);

        get('amsterdam').then(function (data) {
            parent.html(Reversi.templates.weather({
                city: 'amsterdam',
                general: data.weather[0].description,
                temperature: data.main.temp,
                humidity: data.main.humidity,
            }));
        });
    }

    /**
     * Gets the weather for a certain city.
     *
     * @param {string} city
     *   The city.
     *
     * @return {Promise}
     *   The promise.
     */
    function get (city) {
        const queryString = `weather?q=${city}&APPID=${configMap.apiKey}`;

        return $.get(`${configMap.url}${queryString}`);
    }

    return {
        init,
        get
    };
})();