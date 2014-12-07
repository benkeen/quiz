define([
  "constants",
  "brain",
  "react",
  "jsx!ImageUploaderStep1",
  "jsx!ImageUploaderStep2"
], function(C, brain, React, Step1, Step2) {

  var component = brain.register({
    name: "QuestionType_multipleChoice"
  });


  var Question = React.createClass({
    getInitialState: function() {
      return {
        currentStep: 1,
        imageDoc: {
          status: "incomplete"
        },
        speciesName: "",

        // info about the species
        numSpecies: 0,
        speciesMap: {},
        speciesList: []
      }
    },

    componentWillMount: function() {

      // right off the bat, get the list of species - we'll need them later on
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

      // create a new image
      brain.db.createImageDoc(this.state.imageDoc, function(resp) {
        var newState = React.addons.update(self.state, {
          imageDoc: {
            $merge: {
              _id: resp.id,
              _rev: resp.rev
            }
          }
        });
        self.setState(newState);
      });

      component.subscribe(C.EVENTS.CONTINUE, this.continue);
    },

    // each step updates the document in place and returns the updated imageDoc
    continue: function(msg) {
      var stateUpdates = {
        currentStep: { $set: this.state.currentStep + 1 }
      };
      if (this.state.currentStep === 1) {
        stateUpdates.imageDoc = {
          $merge: {
            _id: msg.data.id,
            _rev: msg.data.rev,
            filename: msg.data.filename
          }
        };
      }

      var newState = React.addons.update(this.state, stateUpdates);
      this.setState(newState);
    },

    render: function() {
      var step;
      if (this.state.currentStep === 1) {
        step = <Step1 imageDoc={this.state.imageDoc} />;
      } else {
        step = <Step2 birdSpecies={this.state.speciesList} imageDoc={this.state.imageDoc} />;
      }

      return (
        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-pills nav-stacked">
              <li className={this.state.currentStep === 1 ? 'active' : 'disabled'}><a href="#">1. Upload Image</a></li>
              <li className={this.state.currentStep === 2 ? 'active' : 'disabled'}><a href="#">2. Crop Image</a></li>
              <li className={this.state.currentStep === 3 ? 'active' : 'disabled'}><a href="#">3. Image Details</a></li>
              <li className={this.state.currentStep === 4 ? 'active' : 'disabled'}><a href="#">4. Complete!</a></li>
            </ul>
          </div>
          <div className="col-lg-9">
            {step}
          </div>
        </div>
      );
    }
  });

  return Question;

});


/*

1. Upload image
2. Resize / Trim image
3. Provide details about the image:
      - Species
      - Picture quality
      - Ease of identification (1-5)
      - Lighting (good, bad, adequate)
      - Time of the year
      - Country
      - Location taken

      Arbitrary data
      - Silhouette
      - Distance shot

 */
