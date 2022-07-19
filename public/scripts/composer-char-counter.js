$(document).ready(function () {
  const counter = $("[name='counter']");

  $("#tweet-text").on("input", function () {
    const charLeft = 140 - this.value.length;
    counter.text(charLeft);
    if (charLeft < 0) {
      counter.addClass("overLimit");
    } else {
      counter.removeClass("overLimit");
    }
  });
});
