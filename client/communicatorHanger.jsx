CommunicatorHanger = React.createClass({

	mixins:[ReactMeteorData],
	getMeteorData(){
		let privateCommunicationSubscription = Meteor.subscribe("privateMessageHangers");
		let privateComm = undefined;
		if(privateCommunicationSubscription.ready()){
			privateComm = PrivateMessageHangers.findOne({userId:Meteor.userId()});
		}
		return{
			privateComm : privateComm
		}
	},

	render(){
		return (
				<div className="container">
					<ul className="nav nav-tabs" role="tablist">
						{this.renderPrivateChatTabs()}
					</ul>
				</div>
			);
	},

	renderPrivateChatTabs(){
		if(this.data.privateComm){
			let allCommunicators = this.data.privateComm.communicatingWith;
			return allCommunicators.map((elem) => {return <ListItem key={elem} communicator={elem}/>})			
		}
	}
});

ListItem = React.createClass({

	getUserName(userId){
		console.log(userId);
		let user = Meteor.users.findOne({_id:userId});
		if(user){
			return {
				username:user.emails[0].address
			}
		}else{
			return {
				username:userId
			}
		}
	},

	render(){
		return (
				<li role="presentation">
					<a href="#" role="tab" data-toggle="tab">{this.getUserName(this.props.communicator).username}</a>
				</li>
			);
	}
});