// YOUR CODE HERE:


var msgs;

var app = {};

app.init = function(){};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // console.log('chatterbox: Message sent: ', data);
      return data;
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      print(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message');
    }
  });
};

app.clearMessages = function(){
  $('#chats').remove();
};

app.addMessage = function(message){
  $('#chats').append('<div class="text">' + message.text + '</div>');
};

app.addRoom = function(){
  $('#roomSelect').append('<div class="room"> </div>');
};

app.server = 'https://api.parse.com/1/classes/chatterbox';

/*
 JQUERY
*/

var print = function(item){
  var results = item.results;
  _.each(results, function(result){
    app.addMessage(result);
    //console.log(result);
  })
}

$('document').ready(function(){
  $('button').on("click", function(){
    app.fetch();

    //app.addMessage(msgs[0]);
  })
});






