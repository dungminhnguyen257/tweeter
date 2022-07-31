$(document).ready(function () {
  //Assign the name atribute to a variable
  const counter = $("[name='counter']");

  $("#tweet-text").on("input", function () {
    const charLeft = 140 - this.value.length;
    //Set the text of the element as the remaining character
    counter.text(charLeft);
    //If the remaining character is smaller than zero then change its color to red
    if (charLeft < 0) {
      counter.addClass("warning");
    } else {
      counter.removeClass("warning");
    }
  });
});
