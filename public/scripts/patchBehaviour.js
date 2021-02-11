
$(()=>{
	
	//colors
	
	let shown = true;


	$(document).on('click', '.frame' ,function(){

		const patch_id = $(this).find('.saveflag').data('patchid');

		const frameID = $(`#frame_${patchObj.id}`);
		

		$(this).addClass('frameExpanded');

		

		const addendum = $(this).find(".addendum");
		console.log(`addendum`,addendum);
		addendum.show();

		////display patches

		ajaxGetAllcomments(patch_id)
			.then((res) => {
				console.log(res);
				renderComments(res);
			});

		




		const closeBtn = addendum.find('.closingBtn');

		closeBtn.on('click', function(event){

			event.preventDefault();
			//hidden for the comment box
			hidden = true;
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
		
		if(shown){
			new_comment.hide();
		}
		///newCommentbtn behaviour
		const newComBtn = addendum.find('.newCommentBtn');

		newComBtn.on('click', function(event){

			shown = false;
			///set it to true again when doing que post request.

			event.preventDefault();

			new_comment.slideDown();

			event.stopPropagation();
		})

		///commentBtn behaviour
		const commentBtn = addendum.find('.commentBtn');

		commentBtn.on('click', function(event){

			shown = true;
			
			event.preventDefault();

			console.log('posting comment')

			const neewCommentTextBox = $(this).children('#comment-text');
			


			if(!neewCommentTextBox.val()){
				// $('.error').slideDown(500);

				//we should keep only return to prevent submiting empty comments
				return
			}
			const safeText = newCommentTextBox.text();

			const commentContent = newCommentTextBox.serialize();

			$.ajax({
		  	method: 'POST',
		  	url: '/comments',
		  	data: commentContent
			})	
			.done(function(result) {
		      $(".commentsContainer").empty();
		      neewCommentTextBox.val('');
		      // neewCommentTextBox.val().length; //optional
		      // $('.counter').html(140);
		      loadTweets();

		    })
		    .fail(function(error) {
		      // Problem with the request
		      console.log(`Error with the request: ${error.message}`);
		    })
		    .always(function() {
		      // This will always run
		      console.log('request completed');
		      // console.log(req.header);
		    });
			
			//we dont stop propagation eher to actually afect the display of the new comment section.
			// event.stopPropagation();
		})

	});

		///this  is a toogle class, quite usefull for icons.
		// $(this).toggleClass('frameExpanded');

	$('.commentBtn').on('click',function(event){
	  
	})

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