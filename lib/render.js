var system = require('system');
var mainURL  = system.args[1];

renderPage(mainURL)

function renderPage(url) {
  var page = require('webpage').create();
  var flag = true;
  var code = 400;

  page.onResourceReceived = function (resource) {
    if (flag && resource.url === url) {
      code = resource.status;
      flag = false;

      if (resource.redirectURL) {
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
