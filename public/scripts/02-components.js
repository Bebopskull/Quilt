  //patchObj is {id,title,url,user_id,description,category_id,media_type_id,created_at, avg_rating}


  //Takes in a patch obj and returns html
  const createPatchElement = function(patchObj) {

    //takes in a string and returns the xml-safe version
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    //the html of a single patch
    const patchEl =
    `<div class= "frame">
    <div class = 'patch' id=${patchObj.id}>
      <div class = 'thumbnail'>
        <img class = 'thumbnailContent' src="./media/thumbnail_demo.png">
      </div>
      <div class = 'patchinfo'>
      <a class='sourceUrl' href='${patchObj.url}'>
      <p>URL: ${patchObj.title}</p>
      </a>
      <p>${patchObj.description}</p>
      <p>${patchObj.category}</p>
      <p class="patch-rating">${patchObj.ave_rating}</p>
       </div>
     </div>
  </div>
  `;
  return patchEl;
  }

  //takes in an array of patch objects and renders html into the <section> element in the document
  const renderPatches = function(patchesArr) {
    let render = '';
    for (patchObj of patchesArr) {
      $patch = createPatchElement(patchObj);
      render = $patch + render;
    }
    $('section.board').append(render);
  }

//optionally takes in a user obj and renders either the "Logged-in" HTML to the navbar or the default login state.
const loginOrLogout = function (user = null) {
  let outputHTML = ''
  if (!user) {
    outputHTML = `<form class="form-inline" action="/login" method="POST" id="login_form">
    <input type="text" name="email" placeholder='email'>
    <button type="submit" class="btn nav-btn">Log In</a>
  </form>`
  } else {
    outputHTML = `
    <div class= nav-item>
     <span class="username"><b>${user.name}&nbsp</b></span>
        <div class="dropdown">
          <button class="dropbtn"><i class="fas fa-user"></i></button>
          <ul class="dropdown-content user-links">
            <li><form class="form-inline" action="/logout" method="POST" id="logout_form">
              <button type="submit" class="btn nav-btn">Logout</button>
              </form></li>
            <li><form class="form-inline" action="/patches" method="POST" id="logout_form">
              <button type="submit" class="btn nav-btn">My Patches</button>
              </form></li>
            <li><form class="form-inline" action="/logout" method="POST" id="logout_form">
              <button type="submit" class="btn nav-btn">Saved</button>
              </form></li>
          </ul>
        </div>
      </div>
    </div>
    `
  }

  $(".login div").html(outputHTML)
}
