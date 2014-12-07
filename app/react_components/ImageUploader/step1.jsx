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

          // now an image has been successfully uploaded, store the image doc ID in memory in case the user refreshes
          // the page. They can come back to whatever step they're in
          brain.setLocalStorage(C.OTHER.CURR_UPLOADING_IMAGE_DOC_ID, {
            docId: self.props.imageDoc._id,
            step: 2
          });

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
            The following steps lead you through the process of adding a new image to our bird picture database.
            There are a few rules to follow:
          </p>

          <ul>
            <li><b>you must be the owner or have rights to any image you upload here.</b></li>
            <li>Please only upload <b>.jpg</b>/<b>.jpeg</b>, <b>.gif</b> or <b>.png</b> files.</li>
            <li>Please keep all images <b>under 300KB</b></li>
            <li>Image dimensions should be within 1024 x 1024. Bear in mind that when they are displayed within our
            interface they will appear in a X by Y box, so you might want to taylor </li>
          </ul>

          <div className="well">
            <input type="file" ref="image" />
          </div>

          <div className="panel panel-default">
            <div className="panel-body">
              <input type="checkbox" /> Legal stuff: I agree that blah de blah.
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
