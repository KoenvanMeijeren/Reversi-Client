$(document).ready(function () {
    const successFeedBackWidget = new FeedbackWidget('feedback-success');
    successFeedBackWidget.show('Veel succes met deze module!', FeedbackTypes.success);

    const errorFeedBackWidget = new FeedbackWidget('feedback-danger');
    errorFeedBackWidget.addActions('Weigeren', 'Akkoord');
    errorFeedBackWidget.show('Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
        'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
        'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n' +
        'optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n' +
        'obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
        'nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit.', FeedbackTypes.danger);

    Env.init(Environments.production);
    Game.init(afterGameInit);

    /**
     * Runs after initializing the game.
     */
    function afterGameInit () {
        Game.Data.init();
        Game.Model.init();
        Game.Reversi.init();

        Game.Data.get().then(game => console.log(game));
    }
});
