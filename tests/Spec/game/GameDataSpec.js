describe('Game Data behavior tests', function () {
    it('should have a global game module', function () {
        expect(Game.Data).toBeDefined();
    });

    it('should have an initialize method', function () {
        expect(typeof Game.Data.init).toBe("function")
    });
});