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
			return allCommunicators.map((elem) => {return <ListItem key={elem.userId} communicator={elem}/>})			
		}
	}
});

ListItem = React.createClass({

	setActiveCommTab(){
		console.log("Active commu with : "+this.props.communicator);
		Session.set("currentlyCommnunicatingWith" ,this.props.communicator.userId);
		this.setState({active:"active"});
	},

	mixins:[ReactMeteorData],

	getMeteorData(){
		let currentlyCommnunicatingWith = Session.get("currentlyCommnunicatingWith");
		if(currentlyCommnunicatingWith && (currentlyCommnunicatingWith == this.props.communicator.userId)){
		return{
			active:"active"
		}}else{
			return {
				active:''
			}
		}
	},

	getInitialState(){
		return {
			active:''
		}
	},

	render(){
		return (
				<li role="presentation" onClick={this.setActiveCommTab} className={this.data.active}>
					<a href="#" role="tab" data-toggle="tab">{this.props.communicator.username}</a>
				</li>
			);
	}
});