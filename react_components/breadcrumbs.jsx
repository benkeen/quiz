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

    shouldComponentUpdate: function(nextProps, nextState) {
      if (_.isEqual(nextProps, this.props)) {
        return false;
      }
    },

    componentWillUpdate: function () {
      this.setBreadcrumbsHTML();
    },

    setBreadcrumbsHTML: function() {
      var html = "";

      var lastIndex = this.props.breadcrumbs.length - 1;
      _.map(this.props.breadcrumbs, function(breadcrumb, index) {

        var item = breadcrumb.label;
        if (_.has(breadcrumb, "link")) {
          item = '<a href="' + breadcrumb.link + '">' + breadcrumb.label + '</a>';
        }
        html += "<span>" + item + "</span>";

        if (index < lastIndex) {
          html += '<span class="delimiter">&raquo;</span>';
        }
      });

      this.state.breadcrumbsHTML = html;
    },

    render: function() {
      this.setBreadcrumbsHTML();

      return (
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header" dangerouslySetInnerHTML={{__html: this.state.breadcrumbsHTML }}></h1>
          </div>
        </div>
      );
    }
  });

  return Breadcrumbs;
});
