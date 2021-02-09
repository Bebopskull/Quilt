  //patchObj is {id,title,url,user_id,description,category_id,media_type_id,created_at, avg_rating}


  //Takes in a patch obj and returns html
  const createPatchElement = function(patchObj) {

    //takes in a string and returns the xml-safe version
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    ///added this line, so the average ratings are limited to 1 decimal.
    let ave_rating = Math.round(patchObj.ave_rating * 10 )/10;

    //the html of a single patch
    const patchEl =
    `<div class= "frame" id = 'frame_${patchObj.id}'>
          <div class = 'patch' id='patch_${patchObj.id}''>
            <div class='infoHeader' id='patchHeader_${patchObj.id}'>
              <a class='sourceUrl' href='${patchObj.url}'>${patchObj.title}</a>
              <p class = 'usertag'>${patchObj.user_id}</p>
            </div>

            <div class = 'tumbnail'>
              <!--a class='sourceUrl' href='${patchObj.url}'-->
                <img class = 'thumbnailContent' src="./media/thumbnail_demo.png">
              <!--</a>-->
            </div>

            <div class = 'patchinfo'>
              <div class='patchinfoLeft'>
                <p>${patchObj.description}</p>
                <p>timetag</p>

              </div>
              <div class='patchinfoRight'>
                <p>${ave_rating}</p>
                <p class = 'saveflag'>
                <p><form method="POST" action="/collection"><input type="hidden" name="patch_id" value="${patchObj.id}"><button type="submit"><i class="far fa-bookmark"></i></button></form> </p>
                  <i class="fab fa-laravel"></i>
                  <i class="far fa-bookmark"></i>
                  <i class="fas fa-bookmark"></i>
                </p>
              </div>

            </div>
          </div>
        </div>`;

  return patchEl;
  }

  //takes in an array of patch objects and renders html into the <section>
  // element in the document
  const renderPatches = function(patchesArr) {
    let render = '';
    for (patchObj of patchesArr) {
      $patch = createPatchElement(patchObj);
      render = $patch + render;
    }
    $('section.board').append(render);
  }

const loggedInNav = function (user) {
  const outputHTML = `
  <div class= nav-item>
   <div class="username"><span>Hi <b>${user.name}&nbsp</b></span></div>
      <div class="dropdown">
        <button class="dropbtn"><i class="fas fa-user"></i></button>
        <ul class="dropdown-content user-links">
          <li><form class="form-inline" action="/logout" method="POST" id="logout_form">
            <button type="submit" class="btn nav-btn">Logout</button>
            </form></li>
          <li><form class="form-inline" action="/patches/:userid" method="GET" id="getPatches">
            <button type="submit" class="btn nav-btn">My Patches</button>
            </form></li>
          <li><form class="form-inline" action="/patches/:collectionid" method="GET" id="getSaved">
            <button type="submit" class="btn nav-btn">Saved Patches</button>
            </form></li>
        </ul>
      </div>
    </div>
  </div>
  `
  return outputHTML;
}

//optionally takes in a user obj and renders either the "logged in user" HTML to the navbar or the default login form.
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
     <div class="username"><span>Hi <b>${user.name}&nbsp</b></span></div>
        <div class="dropdown">
          <button class="dropbtn"><i class="fas fa-user"></i></button>
          <ul class="dropdown-content user-links">
            <li><form class="form-inline" action="/logout" method="POST" id="logout_form">
              <button type="submit" class="btn nav-btn">Logout</button>
              </form></li>
            <li><form class="form-inline" action="/patches/:userid" method="GET" id="getPatches">
              <button type="submit" class="btn nav-btn">My Patches</button>
              </form></li>
            <li><form class="form-inline" action="/patches/:collectionid" method="GET" id="getSaved">
              <button type="submit" class="btn nav-btn">Saved Patches</button>
              </form></li>
          </ul>
        </div>
      </div>
    </div>
    `
  }

  $(".login div").html(outputHTML)
}

//optionally takes in a user and renders "signup" or "addpatch" in the nav depending on whether a user is signed in
const signupOrAddPatch = function (user = null) {
  let outputHTML = ''
  if (!user) {
    outputHTML = `<p>New Quilter? <a id="signup">Sign up!</a>`
  } else {
    outputHTML = `
    <p><a id="add-patch">Add Patch</a>
    `
  }
  $("#user-option").html(outputHTML)
}

//optionally takes in a user obj (with .name property) and renders the navbar depending on whether the user is logged in.
const navState = function (user = null) {
  loginOrLogout(user);
  signupOrAddPatch(user);
}
//variable to store the html of ADDPATCH form