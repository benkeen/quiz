define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var component = brain.register({
    name: "typeAheadField"
  });

  var TypeAheadField = React.createClass({

    propTypes: {
      list: React.PropTypes.array
    },

    getDefaultProps: function() {
      return {
        list: [],
        minLength: 3,
        highlight: true,
        placeholder: 'Enter to search'
      }
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

    shouldComponentUpdate: function(nextProps) {

      // bit thin! But it'll do for now
      if (this.props.list.length !== nextProps.list.length) {
        return true;
      }
    },

    componentDidUpdate: function() {
      var self = this;
      var typeahead = $(self.refs.typeahead.getDOMNode()).typeahead({
        minLength: self.props.minLength,
        highlight: self.props.highlight
      }, {
        name: 'typeAheadField',
        source: self.filterSpeciesList(self.props.list)
      });

      typeahead.on("typeahead:selected", function(e, data) {
        component.publish(C.EVENTS.TYPEAHEAD_ITEM_SELECTED, { speciesName: data.value });
      });
    },

    // return the structure to display and bind the onChange, onSubmit handlers
    render: function () {
      return (
        <input type="text" className="typeaheadField form-control" ref="typeahead" placeholder={this.props.placeholder} />
      );
    }
  });

  return TypeAheadField;
});
