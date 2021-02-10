
$(()=>{
	
	//colors
	const patchColors = [];
	


	$(document).on('click', '.frame' ,function(){

		const patch_id = $(this).find('.saveflag').data('patchid');

		const frameID = $(`#frame_${patchObj.id}`);
		

		$(this).addClass('frameExpanded');

		

		const addendum = $(this).find(".addendum");
		console.log(`addendum`,addendum);
		addendum.show();

		////display patches

		ajaxGetAllcomments(patch_id)
			.then(res => console.log(res));


		////

		const closeBtn = addendum.find('.closingBtn');

		closeBtn.on('click', function(event){

			event.preventDefault();

			const $frame = $(this).closest('.frame');

			$frame.removeClass('frameExpanded');
			// $frame.css('z-index', '0');
			// $frame.css('position', 'static');
			// $frame.css('width', '47vw');
			// $frame.css('height', '60vh');
			// // $frame.css('overflow', 'hidden');
			addendum.hide();


			event.stopPropagation();
		})

		const new_comment = $(this).find(".new_comment");
		
		new_comment.hide();

		const newComBtn = addendum.find('.newCommentBtn');

		newComBtn.on('click', function(event){

			event.preventDefault();

			new_comment.slideDown();

			event.stopPropagation();
		})



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