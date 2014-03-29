// all we really need to do here is open the window
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create( '/index.html', {
        state: 'maximized'
    });
});
