/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetData) {
  const $tweet = `<article class="tweet">
    <div class="header">
      <div class="user">
        <img src="${tweetData.user.avatars}" width="80" height="80">
        <span class="name">${tweetData.user.name}</span>
      </div>
      <div class="handle">${tweetData.user.handle}</div>
    </div>
    <div class="content">
    <p>${escapeScript(tweetData.content.text)}</p>
    </div>
    <footer>
      <div class="time">${timeago.format(tweetData.created_at)}</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

// const createLoadingEl = function () {
//   const $tweet = `<section class="loader-wrapper">
//         <svg class="cube" style="height:80px" version="1.1" viewBox="0 0 490.45 490.45" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
//           <path d="m245.23 0-201.39 126.81v236.82l201.39 126.81 201.39-126.81v-236.82l-201.39-126.81zm158.24 135.1-158.24 99.643-158.24-99.643 158.24-99.643 158.24 99.643zm-329.63 27.172 156.39 98.477v184.81l-156.39-98.478v-184.81zm186.39 283.29v-184.81l156.39-98.478v184.81l-156.39 98.478z" height:120px"/>
//         </svg>
//       </section>`;
//   return $tweet;
// };

//Renders tweets by looping through data base to produce dynamic tweet
const renderTweets = function (tweetsArr) {
  for (const tweetData of tweetsArr) {
    const tweetHTML = createTweetElement(tweetData);
    $("#all-tweet").prepend(tweetHTML);
  }
};

//Loads tweets on browser via AJAX request
const loadtweets = function () {
  //Show loading screen
  $("#loading").show();
  $.get("/tweets")
    .then(function (tweetsArr) {
      //Clear the tweets only after the server respond
      $(".tweet").remove();
      renderTweets(tweetsArr);

      //Hide loading screen after render tweet
      $("#loading").hide();
    })
    .catch((error) => {
      alert(error);
    });
};

//Error handling
const postNewTweetOnSubmit = function () {
  const maxCounter = 140;
  $("#new-tweet").on("submit", (evt) => {
    evt.preventDefault();
    muteErrorMessage();
    const tweetText = escapeScript($("#tweet-text").val());

    if (tweetText === "" || tweetText === null) {
      showErrorMessage("Your tweet cannot be empty!");
      return;
    }

    if (tweetText.length > maxCounter) {
      showErrorMessage("Your tweet cannot exceed 140 characters!");
      return;
    }

    //Request to post information to data base via AJAX request
    const param = $("#new-tweet").serialize();
    $.post("/tweets", param).then(() => {
      // setTimeout(() => {
      muteErrorMessage();
      $("#tweet-text").val("");
      $("[name='counter']").html(maxCounter);
      loadtweets();
      // }, 3000);
    });
  });
};

const showErrorMessage = function (errorMessage) {
  $("#error-message").html(errorMessage);
  $("#error").slideDown("slow");
};

const muteErrorMessage = function () {
  $("#error").slideUp();
  $("#error-message").html("");
};

const escapeScript = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//DOM is ready
$(document).ready(function () {
  loadtweets();
  postNewTweetOnSubmit();
});
