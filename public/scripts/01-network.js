//THIS file is for all the ajax request routes (Please do not have any .thens here)

//returns the res.send of the route in routes/patches: "GET /"
function ajaxGetAllPatches() {
return $.ajax({
  method: "GET",
  url: "api/patches/"
})
}

//returns the res.send of the route in routes/comments: "GET /"
function ajaxGetAllcomments(patchId) {
return $.ajax({
  method: "GET",
  url: `api/comments/${patchId}`
})
}

//takes in form data (must have email) and returns the user obj
function ajaxLogin(data) {
return $.ajax({
  method: "POST",
  url: "/api/users/login",
  data,
})
}

function ajaxLogout() {
  return $.ajax({
    method: "POST",
    url: "/api/users/logout"
  })
}

//takes in a user obj (must have user.id) and returns owned patches
function ajaxGetUserPatches(data) {
  return $.ajax({
    method: "POST",
    url: "/api/patches/user",
    data,
  })
}

//returns null if no user is logged in, else returns user obj
function ajaxGetUser() {
return $.ajax({
  url: "/api/users/login",
})
}
