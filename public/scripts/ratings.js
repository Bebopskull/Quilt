/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


$('form').hide();

/////new tweet form button behaviour/////

// $(".fa-angle-double-down").on('click',function(event){

//   $('form').slideToggle('300');
//   $('.error').slideUp(300);

// });


// Dealing with Textarea Height

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
  // console.log(container)
  // return
};

const loadComments = function() {

    $.ajax({
      method: 'GET',
      url: '/comments',
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



// loadTweets();
