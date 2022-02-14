describe('Feedback widget behavior', function () {
    beforeAll(function(done) {
        $(function(){
            done();
        });
    });

    it('should have an initialized success feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-success');

        expect($('#feedback-success')).toBeDefined();
    });

    it('can hide or show the success feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-success');

        feedbackWidgetSpec.show('test', FeedbackTypes.success);
        expect($('#feedback-success').hasClass('d-block')).toBeTruthy();
        expect($('#feedback-success').hasClass('alert-success')).toBeTruthy();
        feedbackWidgetSpec.hide();
        expect($('#feedback-success').hasClass('d-none')).toBeTruthy();
        feedbackWidgetSpec.show('test');
        expect($('#feedback-success').hasClass('d-block')).toBeTruthy();
        expect($('#feedback-success').hasClass('alert-info')).toBeTruthy();
    });

    it('should have an initialized error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger');

        expect($('#feedback-danger')).toBeDefined();
        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy();
    });

    it('can hide or show the error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger');

        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy();
        feedbackWidgetSpec.show('test', FeedbackTypes.danger);
        expect($('#feedback-danger').hasClass('alert-danger')).toBeTruthy()
        expect($('#feedback-danger').hasClass('d-block')).toBeTruthy()
        feedbackWidgetSpec.hide('test', FeedbackTypes.danger);
        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy()
        expect($('#feedback-danger').hasClass('alert-danger')).toBeTruthy()
    });
});