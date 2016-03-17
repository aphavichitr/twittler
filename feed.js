$(document).ready(function(){
  // Format date
  var formatDate = function(date) {
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var hours = date.getHours() % 12 || 12;
    var ampm = hours >= 12 ? 'PM' : 'AM';

    return hours + ':' + date.getMinutes() + " " + ampm + " - " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
  };

  // Display tweets on feed
  var index = streams.home.length - 1;

  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');

    $tweet.append('<a href="#" class="' + tweet.user + '">' + '@' + tweet.user + '</a>');
    $tweet.append('<p>' + tweet.message + '</p><p>' + formatDate(tweet.created_at) + '</p>');
    $('section').closest('.feed').append($tweet);
    index -= 1;
  }

  // Click on user's link and retrieve all tweets from that user
  $('a').on('click', function() {
    $('div').html('');
    var $user = $(this).attr('class');
    var index = streams.users[$user].length - 1;
    while(index >= 0){
      var tweet = streams.users[$user][index];
      var $tweet = $('<div></div>');
      $tweet.append('<a href="#" class="' + tweet.user + '">' + '@' + tweet.user + '</a>');
      $tweet.append('<p>' + tweet.message + '</p><p>' + formatDate(tweet.created_at) + '</p>');
      $('section').append($tweet);
      index -= 1;
    }
  });
});