define([
  "constants",
  "brain",
  "react",
  "jsx!TypeAheadField"
], function(C, brain, React, TypeAheadField) {


  var Step2 = React.createClass({

    getInitialState: function() {
      return {
        birdSpecies: [],
        $image: null
      }
    },

    componentDidMount: function() {
      this.componentDidUpdate();
    },

    componentDidUpdate: function() {

      // if the cropper already existed, kill it
      if (this.state.$image !== null) {
        this.$image.cropper("reset");
      }

      var $image = $(this.refs.image.getDOMNode());
        //$dataX = $("#dataX"),
        //$dataY = $("#dataY"),
        //$dataHeight = $("#dataHeight"),
        //$dataWidth = $("#dataWidth");

      $image.cropper({
        aspectRatio: "auto",
        data: { },
        preview: ".img-preview",
        done: function(data) {
        }
      });

      this.setState({
        $image: $image
      });
    },

    render: function () {
      var imageLocation = "img/" + this.props.imageDoc.filename;

      return (
        <div>
          <p>
            If you'd like to trim or crop the image, click the <b>Enable Cropping Tool</b> button. Once you're happy
            with it, click Continue below.
          </p>

          <div className="well">
            <input type="button" className="btn btn-default" value="Enable Cropping Tool" />
          </div>

          <div className="row">
            <div className="col-lg-10">
              <div className="img-container">
                <img src={imageLocation} ref="image"/>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="img-preview bird-image-preview"></div>
            </div>

          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>
                <input type="submit" className="btn btn-success" value="Continue &raquo;" />
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return Step2;

});
