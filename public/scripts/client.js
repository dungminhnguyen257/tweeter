/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    createTweetElement(tweet);
  }
};

const createTweetElement = function (data) {
  let $tweet = `<article class="tweet">
    <div class="header">
      <div class="user">
        <img src="${data.user.avatars}" width="50" height="50">
        <span class="name">${data.user.name}</span>
      </div>
      <div class="handle">${data.user.handle}</div>
    </div>
    <div class="content">
    <p>${data.content.text}</p>
    </div>
    <footer>
      <div class="time">${data.created_at}</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $("#tweets-container").append($tweet);
};

$(document).ready(function () {
  renderTweets(data);

  $("#new-tweet").on("submit", (evt) => {
    evt.preventDefault();
    const param = $("#new-tweet").serialize();
    console.log(param);
    $.post("/tweets", param).then((data) => {
      console.log(data);
    });
  });
});
