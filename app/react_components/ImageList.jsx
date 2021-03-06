define([
  "react"
], function(React) {

  var ImageList = React.createClass({

    onSubmit: function(e) {
      e.preventDefault();

      var files = this.refs.image.getDOMNode().files;
      var formData = new FormData();

      _.each(files, function(file) {
        console.log(file);
        formData.append("image", file, file.name);
      });


      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.onload = function(resp) {
        if (xhr.status === 200) {
          var json = JSON.parse(resp.target.response);
          //console.log("JSON: ", json);
        } else {
          alert('An error occurred!');
        }
      };

      xhr.send(formData);
    },

    render: function() {
      return (
        <div className="row">
          <div className="col-lg-12">

            Image list here

          </div>
        </div>
      );
    }
  });

  return ImageList;
});
