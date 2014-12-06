define([
  "../../core/constants",
  "brain",
  "react",
  "jsx!TypeAheadField"
], function(C, brain, React, TypeAheadField) {


  var Step2 = React.createClass({

    getInitialState: function() {
      return {
        image: ""
      }
    },

    componentWillMount: function() {
      var self = this;
      brain.db.getImage(self.props.imageDocId, function(resp) {
        console.log(resp);
        self.setState({
          image: resp.data
        });
      });
    },

    render: function () {
      return (
        <div>
          <div className="row">
            <div className="col-lg-12">
              <img src={this.state.image} width="100%" />
            </div>
          </div>
        </div>
      );
    }
  });

  return Step2;

});
