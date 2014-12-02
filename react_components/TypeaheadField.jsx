// not generic right now. TODO.
define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var component = brain.register({
    name: "typeaheadField"
  });

  var TypeAheadField = React.createClass({

    // since we are starting off without any data, there is no initial value
    getInitialState: function() {
      return {
        numSpecies: 0,
        speciesMap: {},
        speciesList: []
      };
    },

    filterSpeciesList: function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    },

    componentDidMount: function() {
      var self = this;

      brain.db.getSpeciesList(function(resp) {
        var list = [];
        var map = {};
        _.each(resp.rows, function(item) {
          list.push(item.key);
          map[item.key] = item.id;
        });
        self.setState({
          numSpecies: resp.total_rows,
          speciesMap: map,
          speciesList: list
        });
      });

      setTimeout(function() {
        var myTypeahead = $(self.refs.typeahead.getDOMNode()).typeahead({minLength: 3, highlight: true}, {
          name: 'bird-species',
          source: self.filterSpeciesList(self.state.speciesList)
        });

        myTypeahead.on("typeahead:selected", function(e, data) {
          component.publish(C.EVENTS.TYPEAHEAD_ITEM_SELECTED, { speciesName: data.value });
        });
      }, 100);
    },

    // return the structure to display and bind the onChange, onSubmit handlers
    render: function () {
      return (
        <input type="text" className="typeaheadField form-control" ref="typeahead" placeholder="Enter species name" />
      );
    }
  });

  return TypeAheadField;
});
