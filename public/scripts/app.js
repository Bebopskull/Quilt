//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.


//ajax functions are declared in scripts/01-network
//functions to render HTML are in scripts/02-components

$(() => { //the jquery document.on ready function

  //ON LOAD

  const clearPage = function() {
    $("section.board").empty()
  }
  //displays all patches
  ajaxGetAllPatches()
  .then (res => {
    renderPatches(res)
  });

  //displays log-in/log-out depending if user is logged in
  ajaxGetUser()
  .then (res => {
    loginOrLogout(res)
  })

  //EVENT LISTENERS

  //loads in all patches when click on home
  $(".to-home").on("click", function (event) {
    event.preventDefault();

    clearPage();

    ajaxGetAllPatches()
    .then (res => {
    renderPatches(res)
    });
  })


  //When log in, do this.
  $(".login").on("submit","#login_form", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    ajaxGetUserPatches(data) //adds user.id to cookies
    .then (res => {
      if (!res) {
        console.log('No such user')
      } else {
      clearPage();
      renderPatches(res);   //displays patches created by user
      }
    })
    .then(() => {
      ajaxGetUser()   //returns userobj or null.
      .then(res => {
        loginOrLogout(res) //renders login or logout, depending.
      })
    })
  });

  //LOGOUT
  $(".login").on("submit","#logout_form", function (event) {

    event.preventDefault();
    clearPage();

    ajaxLogout();
    loginOrLogout();
    ajaxGetAllPatches()
    .then (res => {
    renderPatches(res)
    })

  })

  //REGISTRATION FORM
  $('#signup').click(function() {
   console.log("click!");
    $('.registration-section').slideDown(500);
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
        $('.registration-section').slideUp(2200);
      }).fail((e) => {console.log(e)})
    })
  })



  //on click "patch"
  //fetches the existing comments and appends into #patch_id (/get)


 //on click submit of "Add review"
  //1.adds into review database (/post)
  //2.clears comments and re-fetches the comments and appends into #patch_id (/get)

});

