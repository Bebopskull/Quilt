//THIS file is for all the ajax request routes (Please do not have any .thens here)

//returns the res.send of the route in routes/patches: "GET /"
function ajaxGetAllPatches() {
return $.ajax({
  method: "GET",
  url: "api/patches/"
})
}





//returns the res.send of the route in routes/users: "POST /login"
function ajaxGetUserPatches(data) {

$.ajax({
  method: "POST",
  url: "/api/users/login",
  data,
})
}
