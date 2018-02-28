$(document).ready(function() {
  // Create an array of sports

  var sports = [
    'Baseball',
    'Football',
    'Basketball',
    'Hockey',
    'Soccer',
    'Golf',
    'Boxing',
    'Cycling',
    'Tennis',
    'Swimming',
    'Rugby',
    'Running',
    'Auto Racing'
  ];

  // Display buttons

  function displayButtons() {
    $('#gifImages').empty();
    for (i = 0; i < sports.length; i++) {
      var gifButton = $('<button>');
      gifButton.addClass('sport');
      gifButton.addClass('btn btn-primary');
      gifButton.attr('data-name', sports[i]);
      gifButton.text(sports[i]);
      $('#gifImages').append(gifButton);
    }
  }

  // Add new sport buttons

  function newButton() {
    $('#addGif').on('click', function() {
      var sport = $('#sport-input')
        .val()
        .trim();
      if (sport == '') {
        return false;
      }
      sports.push(sport);

      displayButtons();
      return false;
    });
  }

  // Display Gifs

  function displayGifs() {
    var sport = $(this).attr('data-name');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      sport +
      '&api_key=5CbVvX0KByoAoV7hpo4e3niKuNW5wXjU&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);

      $('#gifs').empty();

      var results = response.data;

      for (i = 0; i < results.length; i++) {
        var gifDiv = $('<div>');
        gifDiv.addClass('gifDiv');
        var gifRating = $('<p>').text('Rating: ' + results[i].rating);
        gifDiv.append(gifRating);
        var gifImage = $('<img>');
        gifImage.attr('src', results[i].images.fixed_height_small_still.url);
        gifImage.attr(
          'data-still',
          results[i].images.fixed_height_small_still.url
        );
        gifImage.attr('data-animate', results[i].images.fixed_height_small.url);
        gifImage.attr('data-state', 'still');
        gifImage.addClass('image');
        gifDiv.append(gifImage);
        $('#gifs').prepend(gifDiv);
      }
    });
  }

  displayButtons();
  newButton();

  $(document).on('click', '.sport', displayGifs);
  $(document).on('click', '.image', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });
});
