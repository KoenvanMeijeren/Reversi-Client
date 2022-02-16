describe('Game behavior tests', function () {
    it('should have a global game module', function () {
        expect(Game).toBeDefined();
    });

    it('should have an initialize method', function () {
        expect(typeof Game.init).toBe("function")
    });
});