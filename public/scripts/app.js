//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.


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
