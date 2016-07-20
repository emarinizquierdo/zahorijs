
var clicked = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   if(changeInfo.status == "complete"){
     chrome.browserAction.setIcon({path: "icon2.png"});
     clicked[tabId] = clicked[tabId] || {};
     clicked[tabId].loading = false;
     clicked[tabId].opened = false;
   }
   if(changeInfo.status == "loading"){
     clicked[tabId] = clicked[tabId] || {};
     clicked[tabId].loading = true;
     chrome.browserAction.setIcon({path: "icon2_disabled.png"});
   }
});
var TOKENOAUTH;

chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function(tabs) {


        var USERTOUR_VERSION = '1.0.0';

        if( !clicked[tabs[0].id].opened && !clicked[tabs[0].id].loading){
            clicked[tabs[0].id].opened = true;
            chrome.browserAction.setIcon({path: "icon2_disabled.png"});
        }else{
          return;
        }

        var url = tabs[0].url,
            _effectiveServer = '',
            _localServer = 'http://localhost:8080/editor/',
            _bucketServer = 'https://zahorijs-nefele.rhcloud.com/editor/',
            _nocache = new Date().getTime(),
            _version = "";

        if( url.indexOf('localhost') >= 0 ){

            _effectiveServer = _localServer;
            _version = "";

        }else{

            _effectiveServer = _bucketServer;
            //_effectiveServer = _localServer;
            //_version = ".min";
            _version = "";
        }

        chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
          chrome.tabs.executeScript(null, {

              code: "var script = document.createElement('link');" +
                  "script.setAttribute('rel', 'stylesheet');" +
                  "script.setAttribute('href', '" + _effectiveServer + "main.editor.css?" + _nocache +"');" +
                  "document.head.appendChild(script);" +
                  //"script = document.createElement('link');" +
                  //"script.setAttribute('rel', 'stylesheet');" +
                  //"script.setAttribute('href', '" + _effectiveServer + "main.css?" + _nocache +"');" +
                  "document.head.appendChild(script);" +
                  "script = document.createElement('link');" +
                  "script.setAttribute('rel', 'stylesheet');" +
                  "script.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.css');" +
                  "document.head.appendChild(script);" +
                  "script = document.createElement('script');" +
                  "script.setAttribute('type', 'text/javascript');" +
                  "script.setAttribute('src', '//cdn.tinymce.com/4/tinymce.min.js');" +
                  "document.head.appendChild(script);" +
                  "script = document.createElement('script');" +
                  "script.setAttribute('type', 'text/javascript');" +
                  "script.setAttribute('src', '" + _effectiveServer + "zahorijs.editor" + _version + ".js?" + _nocache +"');" +
                  "document.head.appendChild(script);" +
                  "script = document.createElement('script');" +
                  "script.setAttribute('type', 'text/javascript');" +
                  "script.setAttribute('src', '" + _effectiveServer + "zahorijs" + _version + ".js?" + _nocache +"');" +
                  "document.head.appendChild(script);" +
                  "script = document.createElement('script');" +
                  "script.textContent = 'var TOKENOAUTH=\"" + token + "\";';" +
                  "document.head.appendChild(script);"
          });

        });


    });
});
