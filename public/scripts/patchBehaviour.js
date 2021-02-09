
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



		// on('click','.addendum', function(event){
		// 	$(this).css('display','flex');
		// })



	});

		///this  is a toogle class, quite usefull for icons.
		// $(this).toggleClass('frameExpanded');

///this way the behaviour is assigned to the dinamic element 
	$(document).on('click', '.saveflag' ,function(){
		const patchid = $(this).data('patchid');
		///this  is a toogle class, quite usefull for icons.
		$('i', this).toggleClass('fas').toggleClass('far');


	})
});



// <i class="fas fa-bookmark"></i>togled bookmark
// <i class="far fa-bookmark"></i>