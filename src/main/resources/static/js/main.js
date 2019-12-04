var app = new Vue({
    el: '#app',
    data: function(){
        return{
            greeting: "Hello ",
            authenticated: false,
            username:''
        }
    },
    methods:{
        logout: function(){
            $.post("/logout", function() {
                app.username = '';
                app.authenticated = false;
            })
        }
    }
});

$.get("/user", function(data) {
    app.username = data.userAuthentication.details.name;
    app.authenticated = true;
});


//switch csrf protection
$.ajaxSetup({
    beforeSend : function(xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT'
            || settings.type == 'DELETE') {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/
                .test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-XSRF-TOKEN",
                    Cookies.get('XSRF-TOKEN'));
            }
        }
    }
});