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
    $.post("/tweets", param)
      .then(() => {
        muteErrorMessage();
        $("#tweet-text").val("");
        $("[name='counter']").html(maxCounter);
        loadtweets();
      })
      .catch((error) => {
        alert(error);
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
