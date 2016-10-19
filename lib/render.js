var system = require('system');
var mainURL  = system.args[1];
var flag = true;

renderPage(mainURL)

function renderPage(url) {
  var page = require('webpage').create();
  var code = 400;

  page.onResourceReceived = function (resource) {
    if (resource.url === url) {
      code = resource.status;

      if (flag && resource.redirectURL) {
        flag = false;
        page.close()
        renderPage(resource.redirectURL)
      }
    }
  };

  page.onLoadFinished = function (status) {
    console.log(code + page.content);
    phantom.exit();
  };

  page.onError = function (message, trace) {};

  page.open(url);
}
