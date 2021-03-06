User = React.createClass({

	initiatePrivateChat(event){
		event.preventDefault();
		Meteor.call("createPrivateMsgHanger",this.props.activeUser.user,Meteor.userId());
		Session.set("currentlyCommnunicatingWith" ,this.props.activeUser.user.userId);
		console.log("Private chat initiated by : "+Meteor.userId() + " with "+this.props.user);
	},

	render(){
		return(
			<li onClick={this.initiatePrivateChat}>
				{this.props.activeUser.user.username}
			</li>
		);
	}
});