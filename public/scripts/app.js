//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.


//ajax functions are declared in scripts/01-network
//functions to render HTML are in scripts/02-components

$(() => { //the jquery document.on ready function

  const clearPage = function() {
    $("section.board").empty()
  }

  ajaxGetAllPatches()
  .then (res => {
    renderPatches(res)
  });


  //LOAD IN ALL PATCHES (when clicked on home)
  $(".to-home").on("click", function (event) {
    event.preventDefault();

    clearPage();

    ajaxGetAllPatches()
    .then (res => {
    renderPatches(res)
    });
  })


  //LOGIN
  $("#useremail").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    ajaxGetUserPatches(data)
    .then (res => {
      clearPage();
      renderPatches(res);
    })
  })

  //REGISTRATION FORM
  $('#registration-form').submit((event) => {
    event.preventDefault();

    const name = $("#registration-name").val();
    const email = $("#registration-email").val();
    const password = $("#registration-password").val();

    $.ajax({
      method: "POST",
      url: "/api/patches",
      data: {
        name,
        email,
        password
      }
    }).done(() => {
      $('#registration-form').slideUp(500);
      $('.success-message').fadeIn(100).delay(1000).fadeOut(1000);
    })
  })

  //on click "patch"
  //fetches the existing comments and appends into #patch_id (/get)


 //on click submit of "Add review"
  //1.adds into review database (/post)
  //2.clears comments and re-fetches the comments and appends into #patch_id (/get)

});

