define([
  "constants",
  "brain",
  "react",
  "jsx!TypeAheadField"
], function(C, brain, React, TypeAheadField) {


  var selectedSpecies;
  var component = brain.register({
    name: "QuestionType_multipleChoice-step1",
    init: function() {
      component.subscribe(C.EVENTS.TYPEAHEAD_ITEM_SELECTED, function(msg) {
        selectedSpecies = msg.data.speciesName;
      });
    }
  });


  var Step = React.createClass({
    getInitialState: function () {
      return {
        imageDocId: null,
        imageDocRev: null
      }
    },

    componentWillMount: function() {
      var self = this;
      brain.db.createNewImage(function(resp) {
        self.setState({
          imageDocId: resp.id,
          imageDocRev: resp.rev
        });
      });
    },

    continue: function(e) {
      e.preventDefault();

      var fileUploadField = this.refs.fileUpload.getDOMNode();
      var file = fileUploadField.files[0];

      var putRequest = new XMLHttpRequest();
      putRequest.open('PUT', C.DB.BASE_URL + "/" + C.DB.BIRD_IMAGES.NAME + "/" + this.state.imageDocId + '?rev=' + this.state.imageDocRev, true);
      putRequest.setRequestHeader('Content-Type', "application/json");

      var fileReader = new FileReader();
      fileReader.onload = function(e) {
        putRequest.send(JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          species: selectedSpecies,
          data: e.target.result
        }));
      };
      fileReader.readAsDataURL(file);

      var self = this;
      putRequest.onreadystatechange = function(response) {
        if (putRequest.readyState == 4) {
          component.publish(C.EVENTS.CONTINUE, {
            imageDocId: self.state.imageDocId,
            imageDocRev: self.state.imageDocRev,
            species: selectedSpecies
          });
        }
      };
    },

    render: function () {
      return (
        <div>
          <p>
            Question Format: <i>single bird image</i>, <i>multiple possible responses</i>.
          </p>

          <h3>Step 1</h3>

          <form id="step1Form" method="post" encType="multipart/form-data" onSubmit={this.continue}>
            <input type="hidden" name="_id" id="_id" value={this.state.imageDocId} />
            <input type="hidden" name="_rev" id="_rev" value={this.state.imageDocRev} />

            <div className="row form-group">
              <div className="col-lg-2">Select bird species</div>
              <div className="col-lg-10">
                <TypeAheadField placeholder="Enter species name" list={this.props.birdSpecies} />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-lg-2">Upload Image</div>
              <div className="col-lg-10">
                <div className="form-group">
                  <input type="file" ref="fileUpload" name="_attachments" />
                </div>
                <div>Recommended image size:
                  <b>1024</b> x <b>768px</b>
                </div>
              </div>
            </div>

            <p>
              <input type="submit" className="btn btn-primary" value="Continue &raquo;" />
            </p>
          </form>
        </div>
      );
    }
  });

  return Step;
});
