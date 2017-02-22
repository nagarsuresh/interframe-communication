var IFC = (function () {
    var listener;
    function addListener(callback) {
        listener = callback;
    }

    function publishEvent(msg) {
        var frames = window.frames;
        for (var i = 0; i < frames.length; i++) {
            frames[i].postMessage(msg, "*");
        }
    }

    function receiveMessage(event) {
        listener(event.data);
    }
    window.addEventListener("message", receiveMessage, false);


    return {
        on: addListener,
        send: publishEvent
    }


}());
