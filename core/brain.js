/**
 * TODO - this is all very thin at the moment. I'm just adding enough to get started. I'll refactor later.
 */
define([
  "constants",
], function(C) {
  "use strict";

  // components can be pages or modules. Anything that wants to tie into the pub/sub system
  var components = {};

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

  var init = function() {
    _.each(components, function(val, key) {
      components[key].init();
    });
  };

  var getComponentType = function(type) {
    return _.filter(components, function(val, key) {
      return components[key].type === type;
    });
  };

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

  var subscribe = function(id, subscriptions) {
    components[id].subscriptions = subscriptions;
  };


  return {
    register: register,
    init: init,
    publish: publish,
    subscribe: subscribe
  };

});
