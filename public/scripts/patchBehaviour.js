
$(()=>{

	//colors

	let shown = true;


	$(document).on('click', '.frame' ,function(){

		const patch_id = $(this).find('.saveflag').data('patchid');

		const frameID = $(`#frame_${patchObj.id}`);


		$(this).addClass('frameExpanded');



		const addendum = $(this).find(".addendum");
		addendum.show();

		////display patches

		ajaxGetAllcomments(patch_id)
			.then((res) => {
				renderComments(res);
			});



		const closeBtn = addendum.find('.closingBtn');

		closeBtn.on('click', function(event){

			event.preventDefault();
			//hidden for the comment box
			shown = true;
			const $frame = $(this).closest('.frame');

			$frame.removeClass('frameExpanded');

			addendum.hide();
      $(".new_comment").hide();

			event.stopPropagation();
		})

		const new_comment = $(this).find(".new_comment");

		// if(shown){
		// 	new_comment.hide();
		// }
		///newCommentbtn behaviour
		const newComBtn = addendum.find('.newCommentBtn');

		// newComBtn.on('click', function(event){

		// 	event.preventDefault();
		// 	if (shown) {
    //     new_comment.slideDown();
    //   } else {
    //     new_comment.slideUp();
    //   }

		// 	event.stopPropagation();
		// })

		///commentBtn behaviour
		const commentBtn = addendum.find('.commentBtn');
	});

		///this  is a toogle class, quite usefull for icons.
		// $(this).toggleClass('frameExpanded');



///this way the behaviour is assigned to the dinamic element
	$(document).on('click', '.saveflag' ,function(){

		const patchid = $(this).data('patchid');
		///this  is a toogle class, quite usefull for icons.

		$('i', this).toggleClass('fas').toggleClass('far');

		document.stopPropagation();

	})
});



// <i class="fas fa-bookmark"></i>togled bookmark
// <i class="far fa-bookmark"></i>