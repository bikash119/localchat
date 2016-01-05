
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
	},

	createPrivateMsgHanger:function(communicatingWith,loggedInUser){
		console.log("hanger");
		let loggedInUserHanger = PrivateMessageHangers.findOne({userId:loggedInUser});
		if(!loggedInUserHanger){
			console.log("creating");
			PrivateMessageHangers.insert({userId:loggedInUser,communicatingWith:[communicatingWith]});
		}else{
			let alreadyCommunicatingWith = Array.from(loggedInUserHanger.communicatingWith);
			if (alreadyCommunicatingWith.indexOf(communicatingWith) == -1){
				PrivateMessageHangers.update({userId:loggedInUser},{$push :{communicatingWith:communicatingWith}});
			}
		}
	}
});

Meteor.publish("activeUsers",function(){
	return ActiveUsers.find({});
});
Meteor.publish("privateMessageHangers",function(){
	return PrivateMessageHangers.find({});
});