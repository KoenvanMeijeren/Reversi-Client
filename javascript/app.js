$(document).ready(function () {
    const successFeedBackWidget = new FeedbackWidget('feedback-success');
    successFeedBackWidget.show('Veel succes met deze module!', FeedbackTypes.success);

    const errorFeedBackWidget = new FeedbackWidget('feedback-danger');
    errorFeedBackWidget.show('Haha error!', FeedbackTypes.danger);

    Env.init(Environments.production);
    Game.init(afterGameInit);

    /**
     * Runs after initializing the game.
     */
    function afterGameInit() {
        Game.Data.init();
        Game.Model.init();
        Game.Reversi.init();

        Game.Data.get().then(game => console.log(game));
    }
});
