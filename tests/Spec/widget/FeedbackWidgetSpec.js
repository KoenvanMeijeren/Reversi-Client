describe('Feedback widget behavior', function () {
    beforeAll(function (done) {
        $(function () {
            done()
        })
    })

    it('should have an initialized success feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-success')

        expect($('#feedback-success')).toBeDefined()
    })

    it('can hide or show the success feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-success')

        feedbackWidgetSpec.show('test', FeedbackTypes.success)
        expect($('#feedback-success').hasClass('d-block')).toBeTruthy()
        expect($('#feedback-success').hasClass('alert-success')).toBeTruthy()
        feedbackWidgetSpec.hide()
        expect($('#feedback-success').hasClass('d-none')).toBeTruthy()
        feedbackWidgetSpec.show('test')
        expect($('#feedback-success').hasClass('d-block')).toBeTruthy()
        expect($('#feedback-success').hasClass('alert-info')).toBeTruthy()
    })

    it('should have an initialized error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger')

        expect($('#feedback-danger')).toBeDefined()
        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy()
    })

    it('can hide or show the error feedback widget', function () {
        const feedbackWidgetSpec = new FeedbackWidget('feedback-danger')

        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy()
        feedbackWidgetSpec.show('test', FeedbackTypes.danger)
        expect($('#feedback-danger').hasClass('alert-danger')).toBeTruthy()
        expect($('#feedback-danger').hasClass('d-block')).toBeTruthy()
        feedbackWidgetSpec.hide('test', FeedbackTypes.danger)
        expect($('#feedback-danger').hasClass('d-none')).toBeTruthy()
        expect($('#feedback-danger').hasClass('alert-danger')).toBeTruthy()
    })

    it('logs the feedback when showing the alert', function () {
        localStorage.removeItem('feedback_widget')

        new FeedbackWidget('feedback-danger').show('test')
        let messages = Array.of(JSON.parse(localStorage.getItem('feedback_widget')))
        expect(messages.indexOf({
            message: 'test',
            type: FeedbackTypes.info
        })).toBeTruthy()
        expect(Object.keys(messages[0]).length).toBe(1)

        new FeedbackWidget('feedback-error').show('error!', FeedbackTypes.danger)
        messages = Array.of(JSON.parse(localStorage.getItem('feedback_widget')))

        expect(messages.indexOf({
            message: 'error!',
            type: FeedbackTypes.danger
        })).toBeTruthy()
        expect(Object.keys(messages[0]).length).toBe(2)
    })

    it('removes the logged feedback after more than 10 logs', function () {
        localStorage.removeItem('feedback_widget')

        const widget = new FeedbackWidget('feedback-1')
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)
        widget.log('error!', FeedbackTypes.danger)

        let messages = Array.of(JSON.parse(localStorage.getItem('feedback_widget')))
        expect(Object.keys(messages[0]).length).toBe(9)

        widget.log('error!', FeedbackTypes.danger)

        messages = Array.of(JSON.parse(localStorage.getItem('feedback_widget')))
        expect(Object.keys(messages[0]).length).toBe(10)

        for (delta = 0; delta < 10; delta++) {
            widget.log('error!', FeedbackTypes.danger)

            const messages = Array.of(JSON.parse(localStorage.getItem('feedback_widget')))
            expect(Object.keys(messages[0]).length).toBe(11)
        }
    })

    it('should clear the log when requested', function () {
        localStorage.removeItem('feedback_widget')

        const widget = new FeedbackWidget('feedback-2')
        widget.log('error!', FeedbackTypes.danger)

        expect(localStorage.getItem('feedback_widget') !== null).toBeTruthy()

        widget.removeLog()
        expect(localStorage.getItem('feedback_widget')).toBeNull()
    })
})
