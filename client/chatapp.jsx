Meteor.subscribe("activeUsers");
Meteor.subscribe("privateMessageHangers");
Meteor.subscribe("messages");
let lastUser = null;
Meteor.startup(function(){
	ReactDOM.render(<Navigation />,document.getElementById("navigation"));
	ReactDOM.render(<ChatContainer />,document.getElementById("container"));
});
Tracker.autorun(function(){
	console.log( " Reactive autorun invoked");
	var userId=Meteor.userId();
    if(lastUser){
        Meteor.call("removeFromActiveUsers",lastUser._id);
    }
    lastUser=Meteor.user();
});