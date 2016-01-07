
Accounts.onLogin(function(obj){
	let userId = obj.user._id;

	let activeEntity = ActiveUsers.findOne({userId:userId});
	if(!activeEntity){
		ActiveUsers.insert({userId:obj.user._id,activeOn:new Date(),username:obj.user.emails[0].address});
	}
	let privateMessageHangers = PrivateMessageHangers.findOne({userId:userId});
	if(!privateMessageHangers){
		Meteor.call("createPrivateMsgHanger","public",userId);
	}
});

Meteor.methods({
	removeFromActiveUsers:function(userId){
		ActiveUsers.remove({userId:userId});
	},

	removeFromPrivateMessageHanger(userId){
		PrivateMessageHangers.remove({userId:userId});
	},

	createPrivateMsgHanger:function(communicatingWith,loggedInUser){
		let loggedInUserHanger = PrivateMessageHangers.findOne({userId:loggedInUser});
		if(!loggedInUserHanger){
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
Meteor.publish("messages",function(){
	return Messages.find({});
});