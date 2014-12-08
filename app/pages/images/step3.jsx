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

/*
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
*/
    },

    render: function () {
      return (
        <div>

          <h4>Bird</h4>

          <div className="row">
            <div className="col-lg-12">Does the image contain one or more birds?</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-2">
              <input type="radio" name="imageSpecies" id="is1" value="yes" defaultChecked /> <label htmlFor="is1">Single bird</label>
            </div>
            <div className="col-lg-10">
              <input type="radio" name="imageSpecies" id="is2" value="no" disabled /> <label htmlFor="is2">Multiple birds</label>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-lg-12">
              <TypeAheadField placeholder="Enter species name" list={this.props.birdSpecies} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">Sex</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-2">
              <input type="radio" name="sex" id="s1" value="male" /> <label htmlFor="s1">Male</label>
            </div>
            <div className="col-lg-2">
              <input type="radio" name="sex" id="s2" value="female" /> <label htmlFor="s2">Female</label>
            </div>
            <div className="col-lg-8">
              <input type="radio" name="sex" id="s3" value="unknown" defaultChecked /> <label htmlFor="s3">Unknown</label>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">Age</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-2">
              <input type="radio" name="age" id="a1" value="male" /> <label htmlFor="a1">Juvenile</label>
            </div>
            <div className="col-lg-2">
              <input type="radio" name="age" id="a2" value="female" /> <label htmlFor="a2">Immature</label>
            </div>
            <div className="col-lg-8">
              <input type="radio" name="age" id="a3" value="unknown" /> <label htmlFor="a3">Adult</label>
            </div>
          </div>


          <h4>Image Details</h4>

          <div className="row">
            <div className="col-lg-12">General picture quality</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-1 bold">Poor</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="1" /> 1</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="2" /> 2</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="3" /> 3</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="4" /> 4</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="5" /> 5</div>
            <div className="col-lg-6 bold">Excellent</div>
          </div>

          <div className="row">
            <div className="col-lg-12">How clear is the photograph?</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-1 bold">Blurry</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="1" /> 1</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="2" /> 2</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="3" /> 3</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="4" /> 4</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="5" /> 5</div>
            <div className="col-lg-6 bold">Crisp</div>
          </div>

          <div className="row">
            <div className="col-lg-12">General lighting</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-1 bold">Dark</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="1" /> 1</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="2" /> 2</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="3" /> 3</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="4" /> 4</div>
            <div className="col-lg-1"><input type="radio" name="pictureQuality" value="5" /> 5</div>
            <div className="col-lg-6 bold">Bright</div>
          </div>

          <div className="row">
            <div className="col-lg-12">Image content</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-2"><input type="radio" name="imageContent" value="1" /> Entire bird </div>
            <div className="col-lg-2"><input type="radio" name="imageContent" value="2" /> Head only</div>
            <div className="col-lg-8"><input type="radio" name="imageContent" value="3" /> Other body part</div>
          </div>

          <div className="row">
            <div className="col-lg-12">Time of day taken</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-2"><input type="radio" name="imageContent" value="1" /> Night </div>
            <div className="col-lg-2"><input type="radio" name="imageContent" value="2" /> Day</div>
            <div className="col-lg-2"><input type="radio" name="imageContent" value="3" /> Dawn/dusk</div>
            <div className="col-lg-6"><input type="radio" name="imageContent" value="3" defaultChecked /> Unknown</div>
          </div>

          <div className="row">
            <div className="col-lg-12">Other attributes</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-12">

            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">Date taken</div>
            <div className="col-lg-6">Location</div>
          </div>
          <div className="row form-group">
            <div className="col-lg-4">
              <input type="text" />
            </div>
            <div className="col-lg-8">
              <input type="text" />
            </div>
          </div>

          <p>
            <input type="submit" className="btn btn-primary" value="Continue &raquo;" />
          </p>

        </div>
      );
    }
  });

  return Step3;
});
