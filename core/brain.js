/**
 * TODO - this is all very thin at the moment. I'm just adding enough to get started. I'll refactor later.
 */
define([
  "constants",
  "mediator"
], function(C, mediator) {
  "use strict";

  // components can be pages or modules. Anything that wants to tie into the pub/sub system
  var components = {};

  var registerPages = function(pages) {
    _.each(pages, function(page) {

      // if the page didn't give itself a name, throw an error
      if (!_.has(page, "name")) {
        console.error("A page didn't give itself a name.");
        return;
      }

      // bit dangerous (will overwrite!) but can be cleaned up later
      page.type = C.COMPONENT_TYPES.PAGE;

      components[page.name] = page;
    });
  };

  var registerModules = function(modules) {
    _.each(modules, function(module) {

      // if the page didn't give itself a name, throw an error
      if (!_.has(module, "name")) {
        console.error("A module didn't give itself a name.");
        return;
      }

      module.type = C.COMPONENT_TYPES.MODULE;
      components[module.name] = module;
    });
  };

  var initPages = function() {
    var pages = _getComponentType(C.COMPONENT_TYPES.PAGE);
    _.each(pages, function(val, key) {
      if (_.has(pages[key], "init")) {
        pages[key].init();
      }
    });
  };

  var initModules = function() {
    var modules = _getComponentType(C.COMPONENT_TYPES.MODULE);
    _.each(modules, function(val, key) {
      if (_.has(modules[key], "init")) {
        modules[key].init();
      }
    });
  };

  var _getComponentType = function(type) {
    return _.filter(components, function(val, key) {
      return components[key].type === type;
    });
  };


  return {
    registerPages: registerPages,
    registerModules: registerModules,
    initPages: initPages,
    initModules: initModules
  };

});
