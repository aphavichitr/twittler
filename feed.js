$(document).ready(function(){
  // Format date
  var formatDate = function(date) {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var hours = date.getHours() % 12 || 12;
    var ampm = hours >= 12 ? 'PM' : 'AM';

    return hours + ':' + date.getMinutes() + " " + ampm + " - " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
  };

  var index = streams.home.length - 1;
  var feedIndex = index + 1;

  // Display tweets on feed
  var display = function() {
    $('#return').hide();
    $('#new').show();
    $('div').closest('.feed').html('');

    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');

      $tweet.append('<a href="#" class="users" data-user="' + tweet.user + '">' + '@' + tweet.user + '</a>');
      $tweet.append('<p>' + tweet.message + '</p><p>' + formatDate(tweet.created_at) + '</p>');
      $('section').closest('.feed').append($tweet);
      index -= 1;
    }
  };

  // Update tweets on feed
  var update = function() {
    var newIndex = streams.home.length - 1;

    while(feedIndex <= newIndex) {
      var tweet = streams.home[feedIndex];
      var $tweet = $('<div></div>');

      $tweet.append('<a href="#" class="users" data-user="' + tweet.user + '">' + '@' + tweet.user + '</a>');
      $tweet.append('<p>' + tweet.message + '</p><p>' + formatDate(tweet.created_at) + '</p>');
      $('section').closest('.feed').prepend($tweet);
      feedIndex += 1;
    }
  };

  display();

  // Click on user's link and retrieve all tweets from that user
  $('section').on('click', '.users', function() {
    $('#new').hide();
    $('#return').show();
    $('div').closest('.feed').html('');

    var $user = $(this).data('user');
    var index = streams.users[$user].length - 1;
    while(index >= 0){
      var tweet = streams.users[$user][index];
      var $tweet = $('<div></div>');
      $tweet.append('<a href="#" class="users" data-user="' + tweet.user + '">' + '@' + tweet.user + '</a>');
      $tweet.append('<p>' + tweet.message + '</p><p>' + formatDate(tweet.created_at) + '</p>');
      $('section').append($tweet);
      index -= 1;
    }
  });

  // Click on show new tweets button
  $('.buttons').on('click', '#new', function() {
    update();
  });

  // Return to homepage
  $('.buttons').on('click', '#return', function() {
    display();
  })
});