var IFC = (function () {
    var listeners = [];
    var isSelfIframe = window.self !== window.parent;

    function addListener(type, callback) {
        if (listeners[type]) {
            listeners[type].push(callback);
        } else {
            listeners[type] = [callback];
        }
    }

    function publishEvent(msg) {
        var framesList;
        var publishToTop = false;
        if (!isSelfIframe) {
            framesList = window.frames;
        } else {
            framesList = window.top.frames;
            publishToTop = true;
        }

        for (var i = 0; i < framesList.length; i++) {
            if (framesList[i] !== window.self) {
                framesList[i].postMessage(msg, "*");
            }
        }

        if (publishToTop) {
            window.top.postMessage(msg, "*");
        }


    }

    function receiveMessage(event) {
        var data = event.data;
        var callbacks = listeners[data.type];
        if (callbacks) {
            callbacks.forEach(c => {
                c.apply(null, [data.payload]);
            });
        }
    }

    window.addEventListener("message", receiveMessage, false);


    return {
        on: addListener,
        send: publishEvent
    }


}());
