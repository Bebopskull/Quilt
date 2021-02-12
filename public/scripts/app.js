//This is the main js file that adds event listeners and queries the back-end, then does something with the returned json data.


//ajax functions are declared in scripts/01-network
//functions to render HTML are in scripts/02-components

$(() => { //the jquery document.on ready function

  //HELPER jquery/AJAX FUNCTIONS
  const clearPage = function() {
    $("section.board").empty()
  }

  const savedByUser = function () {
    return ajaxGetUser()   //fetch the user that is logged in
    .then(user => {
      return ajaxGetCollections(user) //get the collections
      .then(collections => {
          return ajaxGetPatchesByColl(collections[0].id)
          .then(patches => {
            const patchIds = [];
            for (patch of patches) {
              patchIds.push(patch.id)
            }
            return patchIds
          })
      })
    })
  }

  //ON LOAD

  //displays all patches
  ajaxGetAllPatches()
  .then (res => {
    renderPatches(res)
  })
  .then (() => {
    savedByUser()
    .then(patchIds => {
      showSavedByUser(patchIds)
    })
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
    })
    .then (() => {
      savedByUser()
      .then(patchIds => {
        showSavedByUser(patchIds)
      })
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
        renderPatches(patches)
      })
      .then (() => {
        savedByUser()
        .then(patchIds => {
          showSavedByUser(patchIds)
        })
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

  // ADD PATCH FORM
  $('#user-option').on("click", "#add-patch", function(event) {
    $('#add-new-patch-section').slideDown(500);
    $('#new-patch').submit(function(event) {
      event.preventDefault();
      const data = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "/api/patches/",
        data
      })
        //function to append patch list
        .done(() => {
          ajaxGetUser()
          .then(user => {
            ajaxGetUserPatches(user)
            .then(patches => {
            clearPage();
            renderPatches(patches)
            })
            .then (() => {
              savedByUser()
              .then(patchIds => {
                showSavedByUser(patchIds)
              })
            });
          })

        })
      $('#add-new-patch-section').slideUp(1000);
      $('.success-message-new-patch').fadeIn(100).delay(1000).fadeOut(1000);
    })
    $('#create-new-exit-button').on("click", function () {
      $('#add-new-patch-section').slideUp(500)
    })
  })

  //REGISTRATION FORM
  $('#user-option').on("click","#signup", function(event) {
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
      })
      // the .done takes what the server sends back
        .done(user => {
          ajaxLogin(user)
            .then(user => {
              navState(user);
              ajaxGetUserPatches(user)
              .then(patches => {
                clearPage();
                renderPatches(patches)
              });
            })
        $('#registration-form').slideUp(500);
        $('.success-message').fadeIn(100).delay(1000).fadeOut(1000);
        $('.registration-section').slideUp(2200);
      })
    })
  });
  $('#exit-button').on("click", function() {
    $('.registration-section').slideUp(500)
  })



  // UPDATE PROFILE FORM
  $(document).on('click', '#updateProfile', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#update-user-section').slideDown(1000);
  });

  $(document).on('click','#update-user-exit-button', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#update-user-section').slideUp(500);
  });

  $('#profile-update-form').submit(function (event) {
  event.preventDefault();
  event.stopPropagation();


  var values = {};
  $.each($('#profile-update-form').serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });
  let name = values.name;
  let email = values.email;
  let password = values.password;
  ajaxGetUser()
    .then(user => {
      const id = parseInt(user.id);
      if(!name) name = user.name;
      if(!email) email = user.email;
      if(!password) password = user.password;
      ajaxUpdateUser(id, name, email, password)
        .then(res => loginOrLogout(res))
        .catch(err => console.log('err in user update', err))
    })

  $('.success-message-update-user').slideDown(500).delay(700).slideUp(700);
  $('#profile-update-form').slideUp(2200);
  })



  $(".login").on("submit","#getPatches", function (event) {

    event.preventDefault();
    ajaxGetUser()
    .then(user => {
      ajaxGetUserPatches(user)
      .then(patches => {
        clearPage();
        renderPatches(patches)
      })
      .then (() => {
        savedByUser()
        .then(patchIds => {
          showSavedByUser(patchIds)
        })
      });
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
            // CollectionHeader(name);
            renderPatches(patches)
          })
          .then (() => {
            savedByUser()
            .then(patchIds => {
              showSavedByUser(patchIds)
            })
          });
        }
      })
    })
  });

  //event listener for clicking on bookmark
  $("section.board").on("click",".far.fa-bookmark",function(event){

    event.preventDefault()
    const patchId = $(this).closest(".saveflag").attr("data-patchid");
    ajaxGetUser()
    .then (user => {
      ajaxSavePatch({user_id: user.id,patch_id: parseInt(patchId)})
      .then(res => console.log(`saved patch ${patchId}`))
      .catch(err => console.log('err in ajax save patch', err))
    })
    .catch(err => console.log('err at app.js', err))

    $("#flash-save").fadeIn("fast").delay(300).fadeOut("fast");
  })

  $("section.board").on("click",".fas.fa-bookmark",function(event){

    event.preventDefault()
    const patchId = $(this).closest(".saveflag").attr("data-patchid");
    ajaxGetUser()
    .then (user => {
      ajaxDeleteFromColl(user.id,parseInt(patchId))
      .then(res => console.log("deleted:",res))
      .catch(err => console.log('err in ajax delete', err))
    })
    .catch(err => console.log('err at getuser.js', err))
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
    .then (() => {
      savedByUser()
      .then(patchIds => {
        showSavedByUser(patchIds)
      })
    });

  })



  $(".category-link").on("click", function(event){

    event.preventDefault();
    const category = $(this).text();

    ajaxPatchesByCategory(category)
    .then (patches => {
      clearPage();
      renderPatches(patches)
    })
    .then (() => {
      savedByUser()
      .then(patchIds => {
        showSavedByUser(patchIds)
      })
    });

  })



//SUBMITTING A COMMENT


  $("section.board").on("submit", ".patchcomment", function (event){

    event.preventDefault();

    ajaxGetUser()
    .then (user => {
      if(!user) {
        return 1;
      }
      return user.id
    })
    .then((userId) => {
      $(this).find(".user-id").val(`${userId}`);
      const data = $(this).serialize();
      ajaxPostReview(data)
      .then(() => {
        $(this).find("textarea").val("")
      })
    })
    .then(()=> {
      const patchId = $(this).attr("data-patchid");
      ajaxGetAllcomments(patchId);
      ajaxGetAveRating(patchId)
      .then(ratingObj => {
        $(this).closest(".frame").find(".ave-rating").html((Math.round(ratingObj.rating * 10 ) / 10));
      })

    })
    .then(()=> {
      $(".new_comment").slideUp();
    })

  })

    // STAR rating on each comment form
  $("section.board").on("click","div.star-rating > s", function(e) {
    e.stopPropagation();

    // remove all active classes first, needed if user clicks multiple times
    $(this).closest('div').find('.active').addClass('inactive');
    $(this).closest('div').find('.active').removeClass('active');

    $(e.target).parentsUntil("div").addClass('active');
    $(e.target).parentsUntil("div").removeClass('inactive'); // all elements up from the clicked one excluding self
    $(e.target).addClass('active');
    $(e.target).removeClass('inactive'); // the element user has clicked on

        var numStars = $(e.target).parentsUntil("div").length+1;
        $('.show-result').text(numStars + (numStars == 1 ? " star" : " stars!"));
    const rating = $(".star-rating").find(".innermost").closest(".active").attr("data-star")
    $(this).closest(".rateSection").find(".rateInput").val(rating)

    });


    $("section.board").on("click", ".newCommentBtn", function (event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).closest(".frame").find(".new_comment").slideToggle();
    })



});