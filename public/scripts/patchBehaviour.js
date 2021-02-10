
$(()=>{
	//frame resize
	
	// $(document).on('load','.addendum', function(event){
	// 	$(this).hide();
	// });

	$(document).on('click', '.frame' ,function(){


		const frameID = $(`#frame_${patchObj.id}`);
		// $(this).toggleClass('frameExpanded');
		$(this).addClass('frameExpanded');
		$(this).css('z-index', '1');
		$(this).css('position', 'absolute');
		$(this).css('width', '97vw');
		$(this).css('height', '84vh');
		$(this).css('overflow', 'scroll');

		// $(this).animate()

		const addendum = $(this).find(".addendum");
		console.log(`addendum`,addendum);
		addendum.show();

		const closeBtn = addendum.find('.closingBtn');

		closeBtn.on('click', function(event){

			event.preventDefault();

			const $frame = $(this).closest('.frame');

			$frame.removeClass('frameExpanded');
			$frame.css('z-index', '0');
			$frame.css('position', 'static');
			$frame.css('width', '47vw');
			$frame.css('height', '60vh');
			// $frame.css('overflow', 'hidden');
			addendum.hide();


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