define([
  "constants"
], function(C) {

  // set the base URL for all queries
  $.couch.urlPrefix = C.DB.BASE_URL;


  /*
  {
    "_id": "_design/species",
    "_rev": "5-f50809a36b3c8bea762bf83173cbc3bd",
    "views": {
    "numSubspecies": {
      "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.CATEGORY == \"issf\") {\n    emit(doc.CATEGORY, 1);\n  }\n}"
    },
    "numSpecies": {
      "reduce": "_sum",
        "map": "function(doc) {\n  if (doc.CATEGORY == \"species\") {\n    emit(doc.CATEGORY, 1);\n  }\n}"
    },
    "speciesList": {
      "map": "function(doc) {\n  if (doc.CATEGORY == \"species\") {\n    emit(doc.PRIMARY_COM_NAME);\n  }\n}"
    }
  },
    "language": "javascript"
  }
  */


  /**
   * This relies on the database having the _view/speciesList.
   */
  // Returns an array of species info [DB source data needs to be cleaned up via show function!]
  var getSpeciesList = function(callback) {
    $.couch.db(C.DB.BIRD_SPECIES.NAME).view(C.DB.BIRD_SPECIES.VIEWS.SPECIES_LIST, {
      success: function(resp) {
        callback(resp); // promise!!
      },
      error: function(status) {
        return;
      }
    });
  };

  var createNewQuestion = function(doc, callback) {
    $.couch.db(C.DB.QUESTIONS.NAME).saveDoc(doc, {
      success: function(resp) {
        callback(resp); // promise!!
      },
      error: function(status) {
        return;
      }
    });
  };

  var createImageDoc = function(doc, callback) {
    $.couch.db(C.DB.BIRD_IMAGES.NAME).saveDoc(doc, {
      success: function(resp) {
        callback(resp);
      },
      error: function(status) {
        return;
      }
    });
  };

  var getImages = function(docId, callback) {
    $.couch.db(C.DB.BIRD_IMAGES.NAME).view(C.DB.BIRD_IMAGES.VIEWS.ALL_IMAGES, {
      success: function(resp) {
        callback(resp); // promise!!
      },
      error: function(status) {
        return;
      }
    });
  };

  var getImageDoc = function(docId, callback) {
    $.couch.db(C.DB.BIRD_IMAGES.NAME).openDoc(docId, {
      success: function(resp) {
        callback(resp);
      },
      error: function(status) {
        return;
      }
    });
  };

  var updateImageDoc = function(doc, callback) {
    $.couch.db(C.DB.BIRD_IMAGES.NAME).saveDoc(doc, {
      success: function(resp) {
        callback(resp);
      },
      error: function(status) {
        return;
      }
    });
  };

  var getDBInfo = function() {
    $.couch.info({
      success: function(resp) {
        console.log(resp);
      },
      error: function(resp) {
        console.log("err:", arguments);
      }
    })
  };

  return {
    getSpeciesList: getSpeciesList,
    createNewQuestion: createNewQuestion,
    createImageDoc: createImageDoc,
    getImageDoc: getImageDoc,
    getImages: getImages,
    updateImageDoc: updateImageDoc
  };
});


// Total number of species
// http://localhost:8000/bird_species/_design/numSpecies/_view/numSpecies?reduce=true&group=true

// Total number of subspecies
// http://localhost:8000/bird_species/_design/numSpecies/_view/numSubspecies?reduce=true&group=true
