define([
  "constants",
  "brain",
  "react",
  "jsx!Breadcrumbs",
  "jsx!ImageUploaderStep1",
  "jsx!ImageUploaderStep2",
  "jsx!ImageUploaderStep3"
], function(C, brain, React, Breadcrumbs, Step1, Step2, Step3) {

  // component, register thyself
  var pageName = "uploadImagePage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    routes: { "images/add/": addImagePage }
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
      var imageDocId = brain.getLocalStorage(C.OTHER.CURR_UPLOADING_IMAGE_DOC_ID);

      if (imageDocId) {
        brain.db.getImageDoc(imageDocId, function(resp) {
          var newState = React.addons.update(self.state, {
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

      var currentStep = brain.getLocalStorage(C.OTHER.CURR_UPLOADING_IMAGE_STEP);
      if (currentStep) {
        self.setState({ currentStep: currentStep });
      }

      component.subscribe(C.EVENTS.CONTINUE, this.continue);
    },

    // each step updates the document in place and returns the updated imageDoc
    continue: function(msg) {
      var nextStep = this.state.currentStep + 1;
      var stateUpdates = {
        currentStep: { $set: nextStep }
      };
      brain.setLocalStorage(C.OTHER.CURR_UPLOADING_IMAGE_STEP, nextStep);

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

    selectPage: function(e) {
      e.preventDefault();
      this.setState({
        currentStep: $(e.target).data("step")
      });
    },

    render: function() {
      var step;
      if (this.state.currentStep === 1) {
        step = <Step1 imageDoc={this.state.imageDoc} />;
      } else if (this.state.currentStep === 2) {
        step = <Step2 imageDoc={this.state.imageDoc} />;
      } else {
        step = <Step3 birdSpecies={this.state.speciesList} imageDoc={this.state.imageDoc} />;
      }

      // yuuuuck
      var navClasses = { step1: [], step2: [], step3: [], step4: [] };
      navClasses["step" + this.state.currentStep].push("active");
      for (var i=1; i<=4; i++) {
        if (i > this.state.currentStep) {
          navClasses["step" + i].push("disabled");
        }
      }

      return (
        <div className="row">
          <div className="col-lg-3">
            <ul className="nav nav-pills nav-stacked" onClick={this.selectPage}>
              <li className={navClasses.step1.join(" ")}><a href="#" data-step="1">1. Upload Image</a></li>
              <li className={navClasses.step2.join(" ")}><a href="#" data-step="2">2. Crop Image</a></li>
              <li className={navClasses.step3.join(" ")}><a href="#" data-step="3">3. Image Details</a></li>
              <li className={navClasses.step4.join(" ")}><a href="#" data-step="4">4. Complete!</a></li>
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
