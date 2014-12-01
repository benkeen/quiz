define([
  "react"
], function(React) {

  /*
   $("#add").on("submit", function(e) {
   e.preventDefault();

   $.couch.urlPrefix = "http://localhost:8000";

   var data = {
   "question": $("#question").val(),
   "answer": $("#answer").val()
   };

   var file = $("#image").val();

   var databaseName = "questions";
   var db = $.couch.db(databaseName);
   db.saveDoc(data, {
   success: function(resp) {
   if (resp.ok === true) {
   $.ajax({
   type: "PUT",
   url: "/" + databaseName + "/" + resp.id + "/" + $("#image").val() + "?rev=" + resp._rev,
   data: data. Attachment,
   contentType: "multipart/form-data",
   success: function(resp) {
   //show attachments in form
   }
   });

   db.openDoc(resp.id, {
   success: function (result) {
   console.log("okay, opening worked:", result);
   //$("#revision").val(result._rev);
   },
   error: function (a, b, c) {
   alert("Error: " + c);
   console.log("Error on openDoc:", a, b, c);
   }
   })
   }
   },
   error: function(resp) {
   console.log(resp);
   }
   });
   */


  var FileUpload = React.createClass({

    // since we are starting off without any data, there is no initial value
    getInitialState: function () {
      return {
        data_uri: null
      };
    },

    // prevent form from submitting; we are going to capture the file contents
    handleSubmit: function (e) {
      e.preventDefault();
    },

    // when a file is passed to the input field, retrieve the contents as a
    // base64-encoded data URI and save it to the component's state
    handleFile: function (e) {
      var self = this;
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function (upload) {
        self.setState({
          data_uri: upload.target.result
        });
      }

      reader.readAsDataURL(file);
    },

    // return the structure to display and bind the onChange, onSubmit handlers
    render: function () {
      return (
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="file" onChange={this.handleFile} />
        </form>
      );
    }
  });

  return FileUpload;
});
