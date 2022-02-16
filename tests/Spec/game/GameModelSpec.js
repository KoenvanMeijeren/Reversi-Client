describe('Game Model behavior tests', function () {
    it('should have a global game module', function () {
        expect(Game.Model).toBeDefined();
    });

    it('should have an initialize method', function () {
        expect(typeof Game.Model.init).toBe("function")
    });
});