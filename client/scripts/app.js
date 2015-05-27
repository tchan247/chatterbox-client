// YOUR CODE HERE:


var msgs;
var friends = [];

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
  $('#chats').empty();
};

app.addMessage = function(message){
  var weight = friends.indexOf(message.username) > -1? "bold" : "normal";
  console.log(message.username)
  console.log(friends)
  // console.log(weight)
  // message.text.replace(//, '')
  // if(friends.indexOf(message.username) > -1) {
    $('#chats').append('<a href="#" id="username" onclick="func(this)" style="font-weight:'+ weight +'"> ' + message.username +'</a> <br> <div class="text" style="font-weight:'+ weight +'"> ' + message.text + '</div> <br> <a href="#" class="roomname" style="font-weight:'+ weight +'"> ' + message.roomname + ' </a>');
  // } else {
  //   $('#chats').append('<a href="#" id="username" onclick="func(this)"> ' + message.username +' </a> <br> <div class="text">' + message.text + '</div> <br> <a href="#" class="roomname">' + message.roomname + '</a>');
  // }
};

app.addRoom = function(){
  $('#roomSelect').append('<div class="room"> </div>');
};

app.server = 'https://api.parse.com/1/classes/chatterbox';

// temp solution!!!!!!!!!!!!!!!!!!!!!!!!!!! for adding friends
var func = function(that){
  // console.log(that)
  var name = that.text;
  if(friends.indexOf(name) === -1) {
    $('.friends').find('ul').prepend('<li><a href="#">' + name + '</a></li>');
    friends.push(name);
  }
}

/*
 JQUERY
*/

var print = function(item){

  app.clearMessages();
  var results = item.results;
  _.each(results, function(result){
    app.addMessage(result);
    // console.log(result);
  })
}

$('document').ready(function(){
  $('.showMessage').on("click", function(){
    app.fetch();

    //app.addMessage(msgs[0]);
  })

  //show friend messages
  // $('.showFriendMessage').on("click", function(){
  //   app.fetch();

  // });

  $('.submit').on("click", function(){
    var msg = {}
    msg.username = $('.nameInput').val();
    msg.text = $('.textInput').val();
    msg.roomname = $('.roomInput').val();

    app.fetch();

    app.send(msg);
  });

  //Add friends
  // $('#username').on('click', function(){
  //   alert('test');
  //   friends.push(this.text());
  // });
});




