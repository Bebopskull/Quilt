function ajaxGetAllPatches() {
return $.ajax({
  method: "GET",
  url: "api/patches/"
})
}
