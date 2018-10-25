animalArray=["cat","dog","bird"];

//$(".animal-btn").on("click", function(){
$("#button-div").on("click", ".animal-btn", function(){    
    // alert( "Handler for .click() called." );
        var x = $(this).data("animal");
        //alert("clicked button");
        displayAnimal(x);
    
}); 

// $(".animal-btn").click(function(){    
//    // alert( "Handler for .click() called." );
//     var x = $(this).data("animal");
//     //alert("clicked button");
//     displayAnimal(x);

// }); 

function displayAnimal(x){
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5SEijZDpbCWcsYMBHBE68U25UAhUXRlY&q="+x+"&limit=10&offset=0&rating=G&lang=en"
    console.log("x  "+x);
    $.ajax({url:queryURL, method:'GET'})
        .done(function(response){
            $("#GifGoHere").empty();
            for (var i=0; i<response.data.length;i++)
            {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: "+response.data[i].rating);
                var animalImage = $("<img>");
                animalImage.attr("src", response.data[i].images.fixed_height_still.url);
                animalImage.attr("data-animate",response.data[i].images.fixed_height.url);
                animalImage.attr("data-still",response.data[i].images.fixed_height_still.url);
                animalImage.attr("data-state","still");
                animalImage.addClass("gif");
               // $("#GifGoHere").append(p);
               // $("#GifGoHere").append(animalImage);
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#GifGoHere").append(animalDiv);
            }
        });
}

function renderButtons(){
    $("#animal-input").text="";

    var animal= animalArray[animalArray.length-1];
   
        // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-animal", animal);
          // Providing the initial button text
          a.text(animal);
          // Adding the button to the buttons-view div
          $("#button-div").append(a);
}

$("#add-animal").on("click", function (event){
    event.preventDefault();

    var animal=$("#animal-input").val().trim();

    animalArray.push(animal);

    renderButtons();
    displayAnimal(animal);

});


function alertGif(){
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var imageState = $(this).attr("data-state");
    //alert(imageState);

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
  
    if (imageState === "still") {
        //alert("state is still");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");  
      } 
      if (imageState ==="animate") 
      {
        //alert("state is animate");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}

  $(document).on("click", ".gif", alertGif);
 // $(document).on(".animal-btn", displayAnimal);
  //renderButtons();