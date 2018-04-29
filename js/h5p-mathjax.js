
(function ($) {
  if (MathJax === undefined) {
    return; // Missing MathJax
  }
 
  // Hide annoying processing messages
  MathJax.Hub.Config({messageStyle: 'none'});
 
  $(document).ready(function () {
    // Find H5P content
    $('.h5p-content').each(function (i, e) {
      var doJax = function (node) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
      };
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      if (!MutationObserver) {
        var check = function () {
          //$('math', e).each(function (j, m) {
          //   doJax(m.parentNode);
          //});
          doJax(e);
          checkInterval = setTimeout(check, 2000);
        };
        var checkInterval = setTimeout(check, 2000);
      }
      else {
        var running = false;
          var limitedResize = function () {
            if (!running) {
              running = setTimeout(function () {
                //$('math', e).each(function (j, m) {
                //  doJax(m.parentNode);
                //});
                doJax(e);
                running = null;
              }, 500); // 2 fps cap
            }
          };
 
        var observer = new MutationObserver(function (mutations) {
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length) {
              limitedResize();
              return;
            }
          }
        });
        observer.observe(e, {
          childList: true,
          subtree: true
        });
      }
    });
  });
})(H5P.jQuery);
