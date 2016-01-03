
Accounts.onLogin(function(obj){
	let userId = obj.user._id;

	let activeEntity = ActiveUsers.findOne({userId:userId});
	if(!activeEntity){
		ActiveUsers.insert({userId:obj.user._id,activeOn:new Date(),username:obj.user.emails[0].address});
	}
});

Meteor.methods({
	removeFromActiveUsers:function(userId){
		ActiveUsers.remove({userId:userId});
	}
});

Meteor.publish("activeUsers",function(){
	return ActiveUsers.find({});
});