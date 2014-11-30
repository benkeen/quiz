define([
  "react",
  "jsx!FileUpload"
], function(React, FileUpload) {
  "use strict";

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

  var AddMultipleQuestionImage = React.createClass({
    render: function() {
      return (
        <div>
          <p>
            This question type is of the form: single image, with multiple responses - only of which is correct.
          </p>

          <div class="row">
            <div class="col-lg-2">Question</div>
            <div class="col-lg-10">
              <input type="text" class="form-group" />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">Image</div>
            <div class="col-lg-10">
              <input type="text" class="form-group" />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">Num</div>
            <div class="col-lg-2">Correct</div>
            <div class="col-lg-2">Answer</div>
          </div>
        </div>
      );
    }
  });

  return AddMultipleQuestionImage;
});
