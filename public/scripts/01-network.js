//THIS file is for all the ajax request routes (Please do not have any .thens here)

//returns the res.send of the route in routes/patches: "GET /"
function ajaxGetAllPatches() {
return $.ajax({
  method: "GET",
  url: "api/patches/"
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

//takes in a user obj and returns the collections owned by user
function ajaxGetCollections(data) {
  return $.ajax({
    url: "/api/patches/collections",
    method: "POST",
    data,
  })
}

//takes in a collection id and returns the patches in that collection
function ajaxGetPatchesByColl(id) {
  return $.ajax({
    url: `/api/patches/collections/${id}`,
  })
}

//takes in object {user_id, patch_id} key-value pairs with INTEGER values, and saves entry in patches_collections table.
function ajaxSavePatch(data) {
  return $.ajax({
    method: "POST",
    url: '/api/patches/collections/new',
    data,
  })
}


function ajaxSearch(searchStr) {
  return $.ajax({
    method: "GET",
    url: `/api/patches/${searchStr}`
  })
}

//takes in category string, does a url based get
function ajaxPatchesByCategory(category) {
  return $.ajax({
    method: "GET",
    url: `/api/patches/category/${category}`
  })



}