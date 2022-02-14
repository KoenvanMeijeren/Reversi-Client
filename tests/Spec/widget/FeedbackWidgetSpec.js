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

        feedbackWidgetSpec.show();
        expect($('#feedback-success').attr('style')).toBe('display: block;');
        feedbackWidgetSpec.hide();
        expect($('#feedback-success').attr('style')).toBe('display: none;');
        feedbackWidgetSpec.show();
        expect($('#feedback-success').attr('style')).toBe('display: block;');
    });

    it('should have an initialized error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger');

        expect($('#feedback-danger')).toBeDefined();
        expect($('#feedback-danger').attr('style')).toBe('display: none;');
    });

    it('can hide or show the error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger');

        expect($('#feedback-danger').attr('style')).toBe('display: none;');
        feedbackWidgetSpec.show();
        expect($('#feedback-danger').attr('style')).toBe('display: block;');
        feedbackWidgetSpec.hide();
        expect($('#feedback-danger').attr('style')).toBe('display: none;');
    });
});