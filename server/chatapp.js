
Accounts.onLogin(function(obj){
	let userId = obj.user._id;

	let activeEntity = ActiveUsers.findOne({userId:userId});
	if(!activeEntity){
		ActiveUsers.insert({userId:obj.user._id,activeOn:new Date(),username:obj.user.emails[0].address});
	}
	let privateMessageHanger = PrivateMessageHangers.findOne({userId:userId});
	let publicUser = ActiveUsers.findOne({username:"public"});
	if(!privateMessageHanger){
		Meteor.call("createPrivateMsgHanger",publicUser,Meteor.userId());
	}
});

Meteor.startup(function(){
	let publicEmail = {
		address:"public",
		verified:true
	}
	if(Meteor.users.find().count() == 0){
		Meteor.users.insert({createdAt:new Date(),emails:[publicEmail]});
	} 
	let publicUser = Meteor.users.findOne({emails:{$elemMatch:{address:"public"}}});
	let publicActiveUser = ActiveUsers.findOne({username:"public"});
	if(!publicActiveUser){
		ActiveUsers.insert({userId:publicUser._id,activeOn:new Date(),username:publicUser.emails[0].address});
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
		console.log(communicatingWith);
		if(!loggedInUserHanger){
			PrivateMessageHangers.insert({userId:loggedInUser,communicatingWith:[communicatingWith]});
		}else{
			let alreadyCommunicatingWith = Array.from(loggedInUserHanger.communicatingWith);
			let filteredComm = alreadyCommunicatingWith.filter(function(elem){
				console.log(elem.username + " == "+communicatingWith.username);
				return elem.username == communicatingWith.username
			});
			if (filteredComm.length == 0){
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