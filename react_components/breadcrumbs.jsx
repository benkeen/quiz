define([
  "react"
], function(React) {

  var Breadcrumbs = React.createClass({
    getInitialState: function() {
      return {
        breadcrumbsHTML: ""
      }
      this.setBreadcrumbsHTML();
    },

    // TODO
    shouldComponentUpdate: function(nextProps, nextState) {
      return true;
    },

    componentWillUpdate: function () {
      this.setBreadcrumbsHTML();
    },

    // TODO yuck. Incomplete, too.
    setBreadcrumbsHTML: function() {
      var html = "";
      _.map(this.props.breadcrumbs, function(breadcrumb, index) {
        html += "<h1>" + breadcrumb.label + "</h1>";
      });

      this.state.breadcrumbsHTML = html;
    },

    render: function() {
      this.setBreadcrumbsHTML();

      return (
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header" dangerouslySetInnerHTML={{__html: this.state.breadcrumbsHTML }}></div>
          </div>
        </div>
      );
    }
  });

  return Breadcrumbs;
});
