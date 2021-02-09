//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.


//ajax functions are declared in scripts/01-network
//functions to render HTML are in scripts/02-components

$(() => { //the jquery document.on ready function

  //ON LOAD

  //function to clear the display area
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
    loginOrLogout(res);
    signupOrAddPatch(res);
  });

  //EVENT LISTENERS

  //loads in all patches when click on home
  $(".to-home").on("click", function (event) {
    event.preventDefault();

    clearPage();

    ajaxGetAllPatches()
    .then (res => {
    renderPatches(res)
    });
  });

  //When logging in, do this.
  $(".login").on("submit","#login_form", function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    ajaxLogin(data) //adds user.id to cookies, returns user
    .then (user => {

      if (!user) {
        console.log('No such user')
      } else {

      ajaxGetUserPatches(user)
      .then(patches => {
        clearPage();
        renderPatches(patches);
      });

      navState(user);
      }
    })
  });

  //LOGOUT
  $(".login").on("submit","#logout_form", function (event) {

    event.preventDefault();
    clearPage();

    ajaxLogout(); // clears cookies
    navState(); //renders logged out state
    ajaxGetAllPatches() // gets all patches
    .then (res => {
    renderPatches(res)
    })

  })

  //REGISTRATION FORM
  $('#user-option').on("click","#signup", function(event) {
   console.log("click!");
    $('.registration-section').slideDown(500);
    $('#registration-form').submit((event) => {
      event.preventDefault();

      const name = $("#registration-name").val();
      const email = $("#registration-email").val();
      const password = $("#registration-password").val();

      $.ajax({
        method: "POST",
        url: "/api/users/register",
        data: {
          name,
          email,
          password
        }
        // the .done takes what the server sends back
      }).done((serverResponse) => {
        console.log("server response: ", serverResponse);
        $('#registration-form').slideUp(500);
        $('.success-message').fadeIn(100).delay(1000).fadeOut(1000);
        $('.registration-section').slideUp(2200);
        //users.js
        const loggedInHtml = loggedInNav(serverResponse.user);
        $(".login div").html(loggedInHtml);
      })
    })
  })

  //on click of "Add Patch" in the Navbar:
  $('#user-option').on("click","#add-patch", function(event) {
    //clearPage(); to clear the viewport of patches
    //render html of the add-patch form
  });


  //on click "patch"
  //fetches the existing comments and appends into #patch_id (/get)


 //on click submit of "Add review"
  //1.adds into review database (/post)
  //2.clears comments and re-fetches the comments and appends into #patch_id (/get)

});

