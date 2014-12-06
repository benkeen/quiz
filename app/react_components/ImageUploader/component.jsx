define([
  "constants",
  "brain",
  "react",
  "jsx!MultipleChoiceQuestionStep1",
  "jsx!MultipleChoiceQuestionStep2"
], function(C, brain, React, Step1, Step2) {

  var component = brain.register({
    name: "QuestionType_multipleChoice"
  });


  var Question = React.createClass({
    getInitialState: function() {
      return {
        currentStep: 1,

        imageDocId: null,
        imageDocRev: null,
        speciesName: "",

        numSpecies: 0,
        speciesMap: {},
        speciesList: []
      }
    },

    componentWillMount: function() {

      // get the list of species. This info is needed all over the place
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

      component.subscribe(C.EVENTS.CONTINUE, this.continue);
    },

    continue: function(msg) {
      this.setState({
        currentStep: this.state.currentStep + 1,
        speciesName: msg.data.species,
        imageDocId: msg.data.imageDocId,
        imageDocRev: msg.data.imageDocRev
      });
    },

    render: function() {
      if (this.state.currentStep === 1) {
        return (
          <Step1 birdSpecies={this.state.speciesList} />
        )
      } else {
        return (
          <Step2 imageDocId={this.state.imageDocId} imageDocRev={this.state.imageDocRev} speciesName={this.state.speciesName} />
        )
      }
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
