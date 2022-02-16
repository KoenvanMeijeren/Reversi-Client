$(document).ready(function () {
    const successFeedBackWidget = new FeedbackWidget('feedback-success');
    successFeedBackWidget.show('Veel succes met deze module!', FeedbackTypes.success);

    const errorFeedBackWidget = new FeedbackWidget('feedback-danger');
    errorFeedBackWidget.show('Haha error!', FeedbackTypes.danger);

    Game.init();
});
