//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.

$(() => {

  const clearPage = function() {
<<<<<<< HEAD
    

  }

=======
    $("section.board").empty()
  }

  ajaxGetAllPatches()
  .then (res => {
    renderPatches(res)
  });


>>>>>>> master
  //LOAD IN ALL PATCHES (when clicked on home)
  $(".to-home").on("click", function (event) {
    event.preventDefault();

<<<<<<< HEAD
    $.ajax({
      method: "GET",
      url: "api/patches/"
    })
    .then (res => console.log(res));
=======
    clearPage();

    ajaxGetAllPatches()
    .then (res => {
    renderPatches(res)
    });
>>>>>>> master
  })


  //LOGIN
  $("#useremail").on("submit", function(event) {
    event.preventDefault();

<<<<<<< HEAD
=======
    clearPage();
>>>>>>> master
    const data = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data,
    })
    //res is the json (name, email, id)
    .then (res => {
<<<<<<< HEAD
      console.log(res);
=======
      renderPatches(res)
>>>>>>> master
    })
  })
});
