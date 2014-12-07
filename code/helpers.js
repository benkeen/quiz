var fs = require('fs-extra');

var helpers = {};

/**
 * Helper function to get a safe filename for an uploaded file. It checks the folder for filename conflicts.
 * @param folder
 * @param filename
 * @returns {*}
 */
helpers.getUploadedFilename = function(folder, filename) {
  var currFilename = filename;
  var num = 1;

  // as long as the file exists, keep adding a -N suffix until we fi
  while (fs.existsSync(folder + currFilename)) {
    var parts = currFilename.split(".");
    var extension = parts.pop();
    var filenameWithoutExtension = parts.join(".");

    // if the file is taken, keep increasing the
    if (helpers.endsWith(filenameWithoutExtension, "-" + num)) {
      var suffix = new RegExp('-' + num);
      num++;
      currFilename = filenameWithoutExtension.replace(suffix, '-' + num) + "." + extension;
    } else {
      currFilename = filenameWithoutExtension + '-' + num + "." + extension;
    }
  };

  return currFilename;
};

helpers.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};


module.exports = helpers;
