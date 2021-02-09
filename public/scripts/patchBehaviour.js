$(()=>{
	$('.patch').toggle(function(event){

		$('.frame').css('z-index','1');
		$('.frame').css('width','90vw');
	})


///this way the behaviour is assigned to the dinamic element 
	$(document).on('click', '.saveflag' ,function(){

		const patchid = $(this).data('patchid');

		///this  is a toogle class, quite usefull for icons.
		$('i', this).toggleClass('fas').toggleClass('far');


	})
});



// <i class="fas fa-bookmark"></i>togled bookmark
// <i class="far fa-bookmark"></i>