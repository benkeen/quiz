define([
  "constants",
  "brain",
  "react",
  "jsx!Breadcrumbs",
  "jsx!ImageUploaderStep1",
  "jsx!ImageUploaderStep2",
], function(C, brain, React, Breadcrumbs, Step1, Step2) {

  // component, register thyself
  var pageName = "uploadImagePage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: function() {
      brain.crossroads.addRoute("images/add/", addImagePage);
    }
  });

  function addImagePage() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    React.render(
      <ImageUploadPage />,
      document.getElementById('content')
    );
  };

  var ImageUploadPage = React.createClass({
    getInitialState: function () {
      return {
        breadcrumbs: [
          { label: "Images", link: "#images" },
          { label: "Add Image" }
        ],
        breadcrumbsRight: '<button class="close" type="button">×</button>'
      };
    },

    render: function () {
      return (
        <div>
          <div id="breadcrumbs">
            <Breadcrumbs breadcrumbs={this.state.breadcrumbs} />
          </div>
          <div id="pageContent">
            <ImageUploadSteps />
          </div>
        </div>
      );
    }
  });

  var ImageUploadSteps = React.createClass({
    getInitialState: function() {
      return {
        currentStep: 1,

        // not sure about this... might be better to just store the ID + rev...
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

      // see if there's an image already in the process of being uploaded. If there is, use that. Otherwise, create a
      // new one and go from there
      var imageDoc = brain.getLocalStorage(C.OTHER.CURR_UPLOADING_IMAGE_DOC_ID);

      if (imageDoc) {
        var imageDocId = imageDoc.docId;
        brain.db.getImageDoc(imageDocId, function(resp) {
          var newState = React.addons.update(self.state, {
            currentStep: { $set: imageDoc.step },
            imageDoc: {
              $merge: {
                _id: resp._id,
                _rev: resp._rev,
                filename: resp.filename
              }
            }
          });
          self.setState(newState);
        });

      } else {
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
      }

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

});
