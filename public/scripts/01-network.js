//returns the res.send of routes/patches
function ajaxGetAllPatches() {
return $.ajax({
  method: "GET",
  url: "api/patches/"
})
}
