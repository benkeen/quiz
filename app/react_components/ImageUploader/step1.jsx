define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var component = brain.register({ name: "ImageUploader-step1" });


  var UploadImage = React.createClass({

    onSubmit: function(e) {
      e.preventDefault();

      var files = this.refs.image.getDOMNode().files;
      var formData = new FormData();

      _.each(files, function(file) {
        formData.append("image", file, file.name);
      });

      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("POST", "/upload", true);
      xhr.onload = function(resp) {
        if (xhr.status === 200) {
          var json = JSON.parse(resp.target.response);
          self.props.imageDoc.filename = json.filename;

          brain.db.updateImageDoc(self.props.imageDoc, function(resp) {
            component.publish(C.EVENTS.CONTINUE, {
              id: resp.id,
              rev: resp.rev,
              filename: json.filename
            });
          });

        } else {
          alert("An error occurred!");
        }
      };
      xhr.send(formData);
    },

    render: function() {
      return (
        <form method="post" action="upload" onSubmit={this.onSubmit} encType="multipart/form-data">

          <p>
            The following steps lead you through the process of adding a new image to our bird picture database. Once
            it's been uploaded, you can use it constructing your questions. Please note: <b>you must be the owner
            or have rights to any image you upload here.</b>
          </p>

          <div className="well">
            <input type="file" ref="image" className="btn btn-default" />
          </div>

          <div className="panel panel-default">
            <div className="panel-body">
              Legal stuff:
            </div>
          </div>

          <p>
            <input type="submit" className="btn btn-success" value="Continue &raquo;" />
          </p>
        </form>
      );
    }
  });

  return UploadImage;
});
