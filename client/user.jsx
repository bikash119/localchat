User = React.createClass({

	initiatePrivateChat(event){
		event.preventDefault();
		Meteor.call("createPrivateMsgHanger",this.props.user,Meteor.userId());
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