define([
  "constants",
  "brain",
  "hasher"
], function(C, brain, hasher) {
  "use strict";

  var init = function() {

    // handle internal links
    $(document).on("click", ".siteLink", function(e) {
      e.preventDefault();
      hasher.setHash(e.target.href);
    });
  };

  init();

});
