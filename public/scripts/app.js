// const { database } = require("pg/lib/defaults");

$(() => {
  //LOGIN
  $("#useremail").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data,
    })
    //res is the user obj (name, email, id)
    .then (res => {
      //lists all patches created by the user
    })
  })
});
