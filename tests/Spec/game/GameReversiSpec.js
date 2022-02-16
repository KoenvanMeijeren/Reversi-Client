describe('Game Reversi behavior tests', function () {
    it('should have a global game module', function () {
        expect(Game.Reversi).toBeDefined();
    });

    it('should have an initialize method', function () {
        expect(typeof Game.Reversi.init).toBe("function")
    });
});