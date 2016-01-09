User = React.createClass({

	propTypes:{
		user:React.PropTypes.object.isRequired
	},

	initiatePrivateChat(event){
		event.preventDefault();
		Meteor.call("createPrivateMsgHanger",this.props.user,Meteor.userId());
		console.log("Private chat initiated by : "+Meteor.userId() + " with "+this.props.user);
	},

	render(){
		return(
			<li onClick={this.initiatePrivateChat}>
				{this.props.user.username}
			</li>
		);
	}
});