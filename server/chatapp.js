
Accounts.onLogin(function(obj){
	let userId = obj.user._id;

	let activeEntity = ActiveUsers.findOne({userId:userId});
	let user = {
		userId : obj.user._id,
		username: obj.user.emails[0].address,
		email: obj.user.emails[0].address
	}
	if(!activeEntity){
		ActiveUsers.insert({userId:obj.user._id,activeOn:new Date(),user:user});
	}
	let privateMessageHanger = PrivateMessageHangers.findOne({userId:userId});
	let publicUser = ActiveUsers.findOne({"user.username":"public"});
	if(!privateMessageHanger){
		Meteor.call("createPrivateMsgHanger",publicUser.user,Meteor.userId());
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
	let publicActiveUser = ActiveUsers.findOne({"user.username":"public"});
	if(!publicActiveUser){
		let user = {
			userId : publicUser._id,
			username: publicUser.emails[0].address,
			email: publicUser.emails[0].address
		}
		ActiveUsers.insert({userId:publicUser._id,activeOn:new Date(),user:user});
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
				return elem.username == communicatingWith.username
			});
			if (filteredComm.length == 0){
				PrivateMessageHangers.update({userId:loggedInUser},{$push :{communicatingWith:communicatingWith}});
			}
		}
	},

	createMessage(recievingUser,message){
		let sender = Meteor.user();
		let sendingUser = {
			userId:sender._id,
			username:sender.emails[0].address,
			email:sender.emails[0].address
		};
		let reciever = Meteor.users.findOne({_id:recievingUser});
		let recipient = {
			userId:reciever._id,
			username:reciever.emails[0].address,
			email:reciever.emails[0].address
		};
		Messages.insert({sender:sendingUser,recipient:recipient,message:message,createdOn:new Date()});
		console.log("Searching if the recipient"+recipient.username+ " is already in communicating with sender" + sendingUser.username);
		let recieverPrivMsgHanger = PrivateMessageHangers.findOne({$and:[{userId:recipient.userId},{communicatingWith:{$elemMatch:{userId:sendingUser.userId}}}]});
		if(!recieverPrivMsgHanger){
			console.log(" Recipent is communicating with sender for first time. Creating a new message hanger for reciepent");
			let senderActiveUser = ActiveUsers.findOne({userId:sendingUser.userId}).user;
			PrivateMessageHangers.update({userId:recipient.userId},{$push : {communicatingWith:senderActiveUser}})
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