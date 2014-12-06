define([
  "constants",
  "crossroads",
  "hasher",
  "database"
], function(C, crossroads, hasher, db) {
  "use strict";

  // components can be pages or modules. Anything that wants to tie into the pub/sub system
  var components = {};
  var nextComponentId = 1;


  // starts the whole app
  var start = function() {
    function parseHash(newHash, oldHash) {
      crossroads.parse(newHash);
    }

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

    var initialPath = window.location.hash.replace(/^#\/?/, "");
    if (initialPath === '/') {
      initialPath = "";
    }
    hasher.setHash(initialPath);
  };


  /**
   * Any piece of code - page, module, arbitrary chunk of code - can register itself. Each gets access to the
   * central pub/sub system. No required params are necessary (yet) but the more it tells us about itself, the more
   * we can get out of it. For example, it can include a list of subscription events to subscribe to
   * ("event name" => callback), an init() function that gets called on page load, and what type it is (see
   * C.COMPONENT_TYPES).
   * @param component
   * @returns {{publish: Function, subscribe: Function}}
   */
  var register = function(component) {

    // let's play safe
    component = (!_.isUndefined(component)) ? component : {};

    var name;
    if (_.has(component, "name")) {
      name = component.name;
    } else {
      name = "comp" + nextComponentId;
      nextComponentId++;
    }

    // store the information about this component
    components[name] = $.extend(true, {
      type: null,
      subscriptions: {},
      init: function() {}
    }, component);

    // return a convenient API for use by whatever just registered itself (page, module)
    return {
      publish: function(msg, data) {
        _publish(name, msg, data);
      },
      subscribe: function(msg, callback) {
        _subscribe(name, msg, callback);
      }
    }
  };

  var init = function() {
    _.each(components, function(val, key) {
      components[key].init();
    });
  };



  // private functions

  var _publish = function(componentID, message, data) {
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

  var _subscribe = function(id, msg, callback) {
    components[id].subscriptions[msg] = callback;
  };


  // return our public API
  return {

    // for use by the startup code
    start: start,
    init: init,

    // for use by pages and modules
    register: register,

    // helpers
    crossroads: crossroads,
    db: db
  };

});
