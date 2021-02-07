// const { database } = require("pg/lib/defaults");

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $("#useremail").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data,
    })

  })
});
