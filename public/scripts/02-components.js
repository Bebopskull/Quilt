  //patchObj is {id,title,url,user_id,description,category_id,media_type_id,created_at, avg_rating}

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
                  <i class="fab fa-laravel"></i>
                  <i class="far fa-bookmark"></i>
                  <i class="fas fa-bookmark"></i>
                </p>
              </div>

            </div>
          </div>
        </div>`
  //   `<div class= "frame">
  //   <div class = 'patch' id=${patchObj.id}>
  //     <div class = 'thumbnail'>
  //       <img class = 'thumbnailContent' src="./media/thumbnail_demo.png">
  //     </div>
  //     <div class = 'patchinfo'>
  //     <a class='sourceUrl' href='${patchObj.url}'>
  //     <p>URL: ${patchObj.title}</p>
  //     </a>
  //     <p>${patchObj.description}</p>
  //     <p>${patchObj.category}</p>
  //     <p>${patchObj.ave_rating}</p>
  //      </div>
  //    </div>
  // </div>
  // `
  ;
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

