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
				<ul className="nav nav-tabs" role="tablist">
					{this.renderPrivateChatTabs()}
				</ul>
			);
	},

	renderPrivateChatTabs(){
		if(this.data.privateComm){
			let allCommunicators = this.data.privateComm.communicatingWith;
			return allCommunicators.map((elem) => {return <ListItem key={elem._id} communicator={elem}/>})			
		}
	}
});

ListItem = React.createClass({

	render(){
		return (
				<li role="presentation">
					<a href="#" role="tab" data-toggle="tab">{this.props.communicator.username}</a>
				</li>
			);
	}
});