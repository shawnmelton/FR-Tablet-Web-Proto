define(['libs/domReady', 'router'], function(domReady, Router){
    domReady(function() {
        window.touchEventType = 'click'; // touchstart
        Router.initialize();
    });
});