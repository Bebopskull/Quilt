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

  //If a user if logged in, resolves the user obj, else resolves null.
  ajaxGetUser()
  .then (res => {
    //displays log-in/log-out depending if user is logged in
    navState(res);
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
        console.log('loggedin patches', patches);
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
    $('#registration-form').submit(function(event) {
      event.preventDefault();
      //stores form data in a variable
      const data = $(this).serialize();
      console.log(data)

      $.ajax({
        method: "POST",
        url: "/api/users/register",
        data,
        // the .done takes what the server sends back
      })
        .done(user => {
          ajaxLogin(user)
            .then(user => {
              navState(user);
              ajaxGetUserPatches(user)
              .then(patches => {
                clearPage();
                console.log("patches",patches);
                renderPatches(patches);
              });
            })
        $('#registration-form').slideUp(500);
        $('.success-message').fadeIn(100).delay(1000).fadeOut(1000);
        $('.registration-section').slideUp(2200);
        //users.js
        // const loggedInHtml = loggedInNav(serverResponse.user);
        // $(".login div").html(loggedInHtml);
      })
    })
  });
  $('#exit-button').on("click", function() {
    $('.registration-section').slideUp(500)
  }
  )

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

  $(".login").on("submit","#getPatches", function (event) {

    event.preventDefault();
    ajaxGetUser()
    .then(user => {
      ajaxGetUserPatches(user)
      .then(patches => {
        clearPage();
        renderPatches(patches)
      })
    })
  });


  $(".login").on("submit","#getSaved", function (event) {

    event.preventDefault();

    ajaxGetUser()   //fetch the user that is logged in
    .then (user => {
      ajaxGetCollections(user) //get the collections
      .then(collections => {
        clearPage();
        if(collections.length === 0) {
          $("section.board").append('<p>No Collections</p>')
        }
        for(coll of collections) {   //loops through the collections and does ajax request for each one
          const appendName = coll.name;
          const getPatches = ajaxGetPatchesByColl(coll.id);
          Promise.all([appendName,getPatches])
          .then(([name,patches]) => {
            CollectionHeader(name);
            renderPatches(patches);
          })
        }
      })
    })
  });

  //event listener for clicking on bookmark
  $("section.board").on("click",".fa-bookmark",function(event){

    event.preventDefault()
    const patchId = $(this).closest(".patch").attr("data-patchId");
    console.log(patchId)
    ajaxGetUser()
    .then (user => {
      ajaxSavePatch({user_id: user.id,patch_id: parseInt(patchId)})
      .then(res => console.log(res))
      .catch(err => console.log('err in ajax save patch', err))
    })
    .catch(err => console.log('err at app.js', err))

    $("#flash-save").fadeIn("slow").delay(500).fadeOut("slow");
  })

  $("#search-form").on("submit", function(event) {
    event.preventDefault()

    const searchStr = $(this).find("input").val()
    encodedStr = encodeURIComponent(searchStr)
    ajaxSearch(encodedStr)
    .then(patches => {
      clearPage();
      renderPatches(patches)
    })

  })

});