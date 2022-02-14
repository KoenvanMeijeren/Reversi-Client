/**
 * De functie onder test
 */
const getWeather = function () {
    return new Promise(function (resolve, reject) {
        return $.getJSON('http://api.openweathermap.org/data/...')
            .done(function (data) {
                data.naam = `Het weer voor: ${data.naam}`;
                resolve(data);

            })
            .fail(function (err) {
                reject(err);
            })
    })
};

describe("Mocking weather api request", function () {

    const response = {
        status: 200,
        responseText: '{"naam":"Ernst"}'
    };

    const onSuccess = jasmine.createSpy('onSuccess');
    const onFailure = jasmine.createSpy('onFailure');

    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it("should have responseText with property naam: 'Ernst'", function () {
        let promiseGetWeather = getWeather();   //functie onder test
        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith(response);
        return promiseGetWeather
            .then(result => {
                expect(result.naam).toContain('Ernst');
                return onSuccess();
            })
            .catch(function (err) {
                return onFailure();
            })
            .finally(function () {
                expect(onSuccess).toHaveBeenCalled();
                expect(onFailure).not.toHaveBeenCalled();
            });
    });
});

describe("Spy-ing weather api request", function () {

    let onSuccess, onFailure, request;

    beforeEach(function () {
        jasmine.Ajax.install();

        onSuccess = jasmine.createSpy('onSuccess');
        onFailure = jasmine.createSpy('onFailure');

        spyOn($, 'getJSON').and.callFake(function (req) {
            let d = $.Deferred();
            // resolve using our mock data
            let data = {x: 1, y: 2}
            d.resolve(data); //resolve leidt tot een succesvolle response, reject leidt tot een error.
            return d.promise();
        });

    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe("onSuccess", function () {
        it("should not have called the spy onSuccess before doing the request", function () {
            expect(onSuccess).not.toHaveBeenCalled();
        });

        it("after the request it should have called the spy onSuccess", function () {
            return getWeather()
                .then(function (data) {
                    return onSuccess();
                })
                .catch(function (err) {
                    return onFailure();
                })
                .finally(function () {
                    expect(onSuccess).toHaveBeenCalled();
                    expect(onFailure).not.toHaveBeenCalled();
                })
        });
    })
});