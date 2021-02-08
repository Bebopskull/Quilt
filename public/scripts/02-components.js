$(() => {

  const createPatchElement = function(patchObj) {
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    const patchEl = //sample html please edit.
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
