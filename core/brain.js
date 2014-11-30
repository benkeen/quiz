/**
 * TODO - this is all very thin at the moment. I'm just adding enough to get started. I'll refactor later.
 */
define([
  "constants",
  "crossroads",
  "hasher"
], function(C, crossroads, hasher) {
  "use strict";

  // components can be pages or modules. Anything that wants to tie into the pub/sub system
  var components = {};


  // starts the whole app
  var start = function() {
    function parseHash(newHash, oldHash) {
      crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

    var initialPath = document.location.pathname;
    if (initialPath === '/') {
      initialPath = "";
    }
    hasher.setHash(initialPath);
  };

  var register = function(rawComponents) {
    _.each(rawComponents, function(component) {

      // if the component didn't give itself a name, throw an error
      if (!_.has(component, "name")) {
        console.error("A page didn't give itself a name.");
        return;
      }

      // weak! Needs better validation
      if (!_.has(component, "type")) {
        console.error("A page didn't give itself a type (page / module).");
        return;
      }

      components[component.name] = $.extend(true, {
        type: null,
        subscriptions: {},
        init: function() {},
        run: function() {}
      }, component);
    });
  };

  var initComponents = function() {
    _.each(components, function(val, key) {
      components[key].init();
    });
  };

  //var getComponentType = function(type) {
  //  return _.filter(components, function(val, key) {
  //    return components[key].type === type;
  //  });
  //};

  var publish = function(componentID, message, data) {
    if (C.DEBUG) {
      console.log("[" + componentID + "] publish(): ", message, data);
    }
    _.each(components, function(val, key) {
      var subscriptions = components[key].subscriptions;

      // if this module has subscribed to this event, call the callback function
      if (_.has(subscriptions, message)) {
        subscriptions[message]({
          sender: componentID,
          data: data
        });
      }
    });
  };

  var subscribe = function(id, msg, callback) {
    components[id].subscriptions[msg] = callback;
  };

  return {
    start: start,
    register: register,
    initComponents: initComponents,
    publish: publish,
    subscribe: subscribe
  };

});
