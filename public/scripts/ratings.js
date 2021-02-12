/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$('form').hide();


const renderComments = function(comments) {
  // loops through tweets

  $(".commentsContainer").empty()

  comments.forEach(function(comment) {
  // calls createTweetElement for each tweet
  	let commento = createCommentElement(comment);
  // takes return value and appends it to the tweets container
  	// $("<p>").text(textFromUser);
  	const container = $(".commentsContainer");
  	container.append(commento);

  })

};




const escapa =  function(str) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}



// loadTweets();
