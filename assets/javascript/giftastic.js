
var emotions = ["Excited", "Happy", "Sad", "Overwhelmed", "Tired","In Love","Motivated", "Hungry","Thinking"];



var numberOfGifs = 10;
var cutOffRating = "PG";

// Display buttons

function renderButtons(){
  for(var i = 0; i < emotions.length; i++){
    var newButton =$("<button>");
    newButton.addClass("btn");
    newButton.addClass("emotion-button");
    newButton.text(emotions[i]);
    $("#button-container").append(newButton);
  }
  $(".emotion-button").unbind("click");

  $(".emotion-button").on('click',function(){

        $(".gif-image").unbind('click');
        $("#gif-container").empty();
        $("#gif-container").removeClass("dotter-border");
        populateGIFContainer($(this).text());
  });
}

function addButton(emotion){
  if(emotions.indexOf(emotion) === -1)  { //if the element can't be found on the array
      emotions.push(emotion)
      $("#button-container").empty();
      renderButtons();
  } 

}

// Show Gifs
function populateGIFContainer(emotion){
  $.ajax ({
            url: "https://api.giphy.com/v1/gifs/search?q=" + emotion +
            "&api_key=zG9cWB2fdhAqDcr9UfzJFW6DLBO8hMXP&rating" + cutOffRating + "&limit=" + numberOfGifs,
            method: "GET"

  }).then(function(response){
          response.data.forEach(function(element){
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDivInfo = $("<div>");
            newDivInfo.addClass("individual-info-container");
        
            
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            newDivInfo.append(" <span class='title'>Title : " + element.title.toUpperCase() + "</span>"+
                          "<br>Rated : "+ element.rating.toUpperCase());
            newDiv.append(newDivInfo);
            
           
            $("#gif-container").append(newDiv);
          });

            $("#gif-container").addClass("dotted-border");
            $(".gif-image").unbind("click");
            $(".gif-image").on("click", function(){

                if($(this).attr("state") === "still"){
                  
                  $(this).attr("state","animated");
                  $(this).attr("src", $(this).attr("animated-data"));

                }
                else{
                       $(this).attr("state", "still");
                       $(this).attr("src", $(this).attr("still-data")); 
                }
            });

  });
}


$(document).ready(function(){
      renderButtons();
      $("#submit").on("click", function(){
        event.preventDefault();
        addButton($("#emotion-input").val().trim());
        $("#emotion-input").val("");
      });

});


//////



