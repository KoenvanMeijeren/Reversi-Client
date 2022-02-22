class Test {
    callBack() {
        return true;
    }
}

describe('Game behavior tests', function () {
    it('should have a global game module', function () {
        expect(Game).toBeDefined();
    });

    it('should have an initialize method', function () {
        expect(typeof Game.init).toBe("function")
    });

    let gameCallback;
    beforeEach(() => {
        gameCallback = new Test();

        spyOn(gameCallback, 'callBack');
    });

    it('should call the callback method after initializing', function () {
        Game.init(gameCallback.callBack);

        expect(gameCallback.callBack).toHaveBeenCalled();
    });

});