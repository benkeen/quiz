define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var component = brain.register({ name: "ImageUploader-step1" });

  var Step2 = React.createClass({

    getInitialState: function() {
      return {
        birdSpecies: [],
        $image: null
      }
    },

    componentDidMount: function() {
      var $image = $(".bootstrap-modal-cropper > img"),
        originalData = {};

      $("#crop-image-modal").on("shown.bs.modal", function() {
        $image.cropper({
          multiple: true,
          data: originalData,
          done: function(data) {

          }
        });
      }).on("hidden.bs.modal", function() {
        originalData = $image.cropper("getData");
        $image.cropper("destroy");
      });
    },

    continue: function() {
      component.publish(C.EVENTS.CONTINUE);
    },

    //showCroppingModal: function() {
    //
    //  // if the cropper already existed, kill it
    //  if (this.state.$image !== null) {
    //    this.$image.cropper("reset");
    //  }
    //
    //  var $image = $(this.refs.image.getDOMNode());
    //  //$dataX = $("#dataX"),
    //  //$dataY = $("#dataY"),
    //  //$dataHeight = $("#dataHeight"),
    //  //$dataWidth = $("#dataWidth");
    //
    //  $image.cropper({
    //    aspectRatio: "auto",
    //    data: { },
    //    preview: ".img-preview",
    //    done: function(data) {
    //    }
    //  });
    //
    //  this.setState({
    //    $image: $image
    //  });
    //
    //},

    render: function () {
      var imageLocation = "img/" + this.props.imageDoc.filename;

      return (
        <div>
          <p>
            If you'd like to trim or crop the image, click the <b>Enable Cropping Tool</b> button. Once you're happy
            with it, click Continue below.
          </p>

          <div className="well">
            <input type="button" className="btn btn-default" value="Enable Cropping Tool" data-toggle="modal"
              data-target="#crop-image-modal" />
          </div>

          <div className="well">
            <div className="row">
              <div className="col-lg-12 img-wrapper">
                <img src={imageLocation} ref="image" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <p>
                <input type="button" className="btn btn-success" value="Continue &raquo;" onClick={this.continue} />
              </p>
            </div>
          </div>

          <div className="modal fade" id="crop-image-modal" aria-hidden="true" aria-labelledby="bootstrap-modal-label" role="dialog" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-body">
                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close" data-dismiss="modal" type="button" aria-hidden="true">&times;</button>
                    <h4 className="modal-title" id="bootstrap-modal-label">Image Cropper</h4>
                  </div>
                  <div className="modal-body">
                    <div className="bootstrap-modal-cropper img-wrapper">
                      <img src={imageLocation} ref="modalImage" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-primary" data-dismiss="modal" type="button">Crop and Save</button>
                    <button className="btn btn-default" data-dismiss="modal" type="button">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }
  });

  return Step2;

});
