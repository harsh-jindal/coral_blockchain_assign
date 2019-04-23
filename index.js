$(document).ready(() => {
  $("#userdata").on("submit", (e) => {
    let username = $("#username").val();
    let password = $("#password").val();
    let emailId = $("#emailId").val();
    let phoneno = $("#phoneno").val();
    let url = "http://localhost:3000/insert";
    $.ajax({
      url: url,
      data: { "username": username, "password": password, "emailId": emailId, "phoneno": phoneno },
      type: "POST",
      success: function (data) {
        $(".tab").empty();
        console.log('process success');
        console.log(data);
        data = JSON.parse(data);
        $(".alert").html(data.message);
        if (data.status === "success") {
          $(".alert").addClass("alert-success");
        } else {
          $(".alert").addClass("alert-danger");
        }
        alert();
      },
      error: function () {
        console.log('process error');
      }
    });
    e.preventDefault();
    setTimeout(function () {
      window.location.reload();
    }, 6000);
  });

  $("#search").on("click", (event) => {
    $(".tab").empty();
    event.preventDefault();
    let email = $("#email").val();
    let url = "http://localhost:3000/search";
    $.ajax({
      url: url,
      data: { "email": email },
      type: "GET",
      success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        if (data.message) {
          $table = $("<table class='table'>" +
            "<thead class='thead-dark'>" +
            "<tr>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>EmailID</th>" +
            "<th scope='col'>Password</th>" +
            "<th scope='col'>Phone No.</th>" +
            "<th scope='col'>Date Joined/Updated</th>" +
            "</tr>" +
            "</thead>" +
            "</table>")
          $(".tab").append($table);
          $(".tab").append(data.message);
        } else {
          $table = $("<table class='table'>" +
            "<thead class='thead-dark'>" +
            "<tr>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>EmailID</th>" +
            "<th scope='col'>Password</th>" +
            "<th scope='col'>Phone No.</th>" +
            "<th scope='col'>Date Joined/Updated</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr>" +
            "<td>" + data.userName + "</td>" +
            "<td>" + data.emailId + "</td>" +
            "<td>" + data.password + "</td>" +
            "<td>" + data.phoneNo + "</td>" +
            "<td>" + data.dateTime + "</td>" +
            "</tr>" +
            "</tbody>" +
            "</table>");
          $(".tab").append($table);
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

  $("#delete").on("click", (e) => {
    console.log("ja");
    let email = $("#email").val();
    console.log(email);
    let url = "http://localhost:3000/delete";
    $.ajax({
      url: url,
      data: { "email": email },
      type: "POST",
      success: function (data) {
        data = JSON.parse(data);
        if (data.status === "fail") {
          $(".tab").append(data.message);
        }
        else {
          $(".tab").empty();
          console.log('process success');
          $(".alert").html(data.message);
          if (data.status === "success") {
            $(".alert").addClass("alert-success");
          } else {
            $(".alert").addClass("alert-danger");
          }
          alert();
        }
      },
      error: function () {
        console.log('process error');
      }
    });
    e.preventDefault();
    setTimeout(function () {
      window.location.reload();
    }, 6000);
  });

  alert = () => {
    $(".alert")
      .delay(5000)
      .slideUp(500, function () {
        $(this).alert("close");
      });
  }
})