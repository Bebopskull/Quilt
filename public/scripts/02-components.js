<<<<<<< HEAD
$(function() {
=======
  //patchObj is {id,title,url,user_id,description,category_id,media_type_id,created_at, avg_rating}
>>>>>>> master

  const createPatchElement = function(patchObj) {
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const patchEl = //sample html please edit.
<<<<<<< HEAD
    `<div>
      <div class="patch-display"
        <span class="creator"></span>
        <span class="title"></span>
        <span class="url"></span>
        <span class="description"></span>
      </div>
      <div class="comment box">
        COMMENT BOX
      </div>
      <div class="description">
        DETAILED DESCRIPTION
      </div>
    </div>
  `;
  return patchEl;
  }

  // const renderPatches = function(patchesArr) {
  //   let render = '';
  //   for (tweetObj of tweetObjsArr) {
  //     $tweet = createTweetElement(tweetObj);
  //     render = $tweet + render;
  //   }
  //   $('#all-tweets').append(render);

  // }


});
=======
    `<div class= "frame">
    <div class = 'patch'>
      <div class = 'thumbnail'>
        <img class = 'thumbnailContent' src="./media/thumbnail_demo.png">
      </div>
      <div class = 'patchinfo'>
      <a class='sourceUrl' href='${patchObj.url}'>
      <p>URL: ${patchObj.title}</p>
      </a>
      <p>${patchObj.description}</p>
      <p>${patchObj.category}</p>
      <p>${patchObj.ave_rating}</p>
       </div>
     </div>
  </div>
  `;
  return patchEl;
  }
  const renderPatches = function(patchesArr) {
    let render = '';
    for (patchObj of patchesArr) {
      $patch = createPatchElement(patchObj);
      render = $patch + render;
    }
    $('section.board').append(render);

  }
>>>>>>> master
