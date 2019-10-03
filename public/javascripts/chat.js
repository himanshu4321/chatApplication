$(document).ready(function() {
        $('#login_btn').click(function(){
            $.ajax({
            type:"POST",
            url : "http://localhost:3000/login",
            data:{ "userName":$("#login").val(),"password":$("#password").val()} , // do I need to pass data if im GET ting?
            dataType: 'json',
            success : function(data){
                console.log(data);
                localStorage.setItem("lastname", data[0].name);
                window.location.href = "http://localhost:3000/chats";
                //doing stuff
                //end success
            },
            always: function() {
                //submit form !!!
            }
        });//end ajax   
        });//end click

        var systemUrl = 'http://localhost:3000';
        var socket    = io().connect(systemUrl);
        getUserList();
        $(document).on('click', '.msg_send_btn', function(event) {
            var message_history = '';
            var cu_message = $(".write_msg").val();
            message_history+='<div class="received_msg"><div class="received_withd_msg"><p>'+cu_message+'</p> <span class="time_date"> 11:01 AM | June 9</span></div></div>';
            $(".incoming_msg").append(message_history);
            socket.emit('private_chat',{
                to :  $(this).attr("data-id"),
                message : cu_message
            });
        })
        
        $(document).on('click', '.test', function(event) {
            var message_history = '';
            $(".msg_send_btn").attr("data-id",$(this).text());
            message_history+=''
        })

        function getUserList(){
            var messageAppend = '';
            $.ajax({
                type:"GET",
                url : "http://localhost:3000/chats/chatUsers",
                //data:{ "userName":$("#login").val(),"password":$("#password").val()} , // do I need to pass data if im GET ting?
                dataType: 'json',
                success : function(data){
                    //var UserData =  JSON.parse(data);
                    var current_user = localStorage.getItem("lastname");
                    for(var x=0;x<data.length;x++){
                        var name = data[x].name;
                        if(name!=current_user){
                            messageAppend+= '<div class="chat_people"><div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div><p class="test">'+name+'</p></div>';
                        }
                    }
                    $(".chat_list").html(messageAppend);
                    //console.log(data);
                   // window.location.href = "http://localhost:3000/chats";
                    //doing stuff
                    //end success
                },
                always: function() {
                    //submit form !!!
                }
            });//end ajax
         }
    });//end rdy

