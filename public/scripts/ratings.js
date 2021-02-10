/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


$('form').hide();

/////new tweet form button behaviour/////

$(".fa-angle-double-down").on('click',function(event){
  
  $('form').slideToggle('300');
  $('.error').slideUp(300);

});
 

// Dealing with Textarea Height

///form behaviour
$('form').on('submit', function(event){



	event.preventDefault();

	console.log('submiting tweet!');

	const neewTweetTextBox = $(this).children('#tweet-text');
	$('.error').slideUp(300);


	if(!neewTweetTextBox.val()){
		$('.error').slideDown(500);
		$('.error').html("<i class='fas fa-exclamation-triangle'></i> Actually, type it out loud before sharing...!!");
		return
	}

	if(neewTweetTextBox.val().length > 140){
		$('.error').slideDown(500);
		$('.error').html("<i class='fas fa-exclamation-triangle'></i> Well, look at the number under your text, you overthe limit...");
		return
	}

	
	const safeText = neewTweetTextBox.text();

	const tweetContent = neewTweetTextBox.serialize();
	///ajax POST request///
	$.ajax({
  	method: 'POST',
  	url: '/comments',
  	data: tweetContent
	})	
	.done(function(result) {
      $(".tweetsContainer").empty();
      neewTweetTextBox.val('');
      neewTweetTextBox.val().length;
      $('.counter').html(140);
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

});




////error behaviour////

$('.error').hide();
//renderTweets
const renderComments = function(comments) {
  // loops through tweets

  comments.forEach(function(comment) {
  // calls createTweetElement for each tweet
  	let commento = createCommentElement(comment);
  // takes return value and appends it to the tweets container
  	// $("<p>").text(textFromUser);
  	const container = $(".tweetsContainer");
  	container.append(tweeto);


  })
  // console.log(container)
  return 
};
///build the tweet html structure
const createCommentElement = function(comment) {
  let $comment = /* Your code for creating the tweet element */
  // ...
  			$(`<article class="comment">
          <header class="commentHead">
            <div class='authorPresentation'>
              <p class="commentAuthorName"> ${comment.user.name} </p>
            </div>
          
          </header>
          <div class="commentContent">
            <p id='commentFrom${comment.user.name}'>${escapa(comment.content.text)}</p>
          </div>
          <footer class='tweetFooter'>
            <p class='date'>${Date(comment.created_at)}</p>
          </footer>
          
        </article>`)

  // $(`#tweetFrom${tweet.user.name}`).text(textFromUser);
  return $comment;
}




const escapa =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}



// loadTweets();
