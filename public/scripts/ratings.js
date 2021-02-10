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
  	url: '/tweets',
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
const renderTweets = function(tweets) {
  // loops through tweets

  tweets.forEach(function(tweet) {
  // calls createTweetElement for each tweet
  	let tweeto = createTweetElement(tweet);
  // takes return value and appends it to the tweets container
  	// $("<p>").text(textFromUser);
  	const container = $(".tweetsContainer");
  	container.append(tweeto);


  })
  // console.log(container)
  return 
};
///build the tweet html structure
const createTweetElement = function(tweet) {
  let $tweet = /* Your code for creating the tweet element */
  // ...
  			$(`<article class="tweet">
          <header class="tweetHead">
            <div class='authorPresentation'>
              <img class='tweetAvatar' src="${tweet.user.avatars}">
              <p class="tweetAuthorName"> ${tweet.user.name} </p>
            </div>

            <p class="tweetAuthorTag">${tweet.user.handle}</p>
          
          </header>
          <div class="tweetContent">
            <p id='tweetFrom${tweet.user.name}'>${escapa(tweet.content.text)}</p>
          </div>
          <footer class='tweetFooter'>
            <p class='date'>${Date(tweet.created_at)}</p>

            <div class='tweetActions'>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="far fa-heart"></i>
            </div>
          </footer>
          
        </article>`)

  // $(`#tweetFrom${tweet.user.name}`).text(textFromUser);
  return $tweet;
}


const loadTweets = function() {

		$.ajax({
	  	method: 'GET',
	  	url: '/tweets',
		})	
		.done(function(result) {
	      
	      console.log();

	      renderTweets(result.reverse());
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
	// });
}

const escapa =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}



loadTweets();
