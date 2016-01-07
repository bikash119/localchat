User = React.createClass({

	propTypes:{
		user:React.PropTypes.object.isRequired
	},

	initiatePrivateChat(event){
		event.preventDefault();
		Meteor.call("createPrivateMsgHanger",this.props.user.userId,Meteor.userId());
		console.log("Private chat initiated by : "+Meteor.userId() + " with "+this.props.user.userId);
	},

	render(){
		return(
			<li onClick={this.initiatePrivateChat}>
				{this.props.user.username}
			</li>
		);
	}
});