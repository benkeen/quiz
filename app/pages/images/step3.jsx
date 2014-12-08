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


  var Step3 = React.createClass({

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

          <h4>Bird</h4>

          <div className="row">
            <div className="col-lg-6">Does the image contain more than one bird?</div>
            <div className="col-lg-6">
              <input type="radio" name="imageSpecies" id="is1" value="yes" checked="checked" /> <label htmlFor="is1">Yes</label>
              <input type="radio" name="imageSpecies" id="is2" value="no" /> <label htmlFor="is2">No</label>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2">Enter bird species</div>
            <div className="col-lg-10">
              <TypeAheadField placeholder="Enter species name" list={this.props.birdSpecies} />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-lg-2">Sex</div>
            <div className="col-lg-10">
              <input type="radio" name="sex" id="s1" value="male" checked="checked" /> <label htmlFor="s1">Male</label>
              <input type="radio" name="sex" id="s2" value="female" /> <label htmlFor="s2">Female</label>
              <input type="radio" name="sex" id="s3" value="unknown" /> <label htmlFor="s3">Unknown</label>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-lg-2">Age</div>
            <div className="col-lg-10">
              <input type="radio" name="sex" id="s1" value="male" checked="checked" /> <label htmlFor="s1">Juvenile</label>
              <input type="radio" name="sex" id="s2" value="female" /> <label htmlFor="s2">Immature</label>
              <input type="radio" name="sex" id="s3" value="unknown" /> <label htmlFor="s3">Adult</label>
            </div>
          </div>


          <h4>PICTURE</h4>

          General picture quality: 1 poor, 10 excellent   [not an aesthetic judgement: how clearly does the picture represent the bird?]

          How clear is the photograph?    1 very blurry, 10 crisp

          Content:      Entire bird, Head only, Other body part only

          Light         Dark, mid-range, Bright

          Night / Day

          Other attributes (select all applicable)
            [silhoette]
            []

          Date taken: [ ]

          Location:

          <p>
            <input type="submit" className="btn btn-primary" value="Continue &raquo;" />
          </p>

        </div>
      );
    }
  });

  return Step3;
});
