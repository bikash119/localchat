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
        Meteor.call("removeFromPrivateMessageHanger",lastUser._id);
    }
    lastUser=Meteor.user();
});