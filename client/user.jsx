User = React.createClass({

	propTypes:{
		user:React.PropTypes.object.isRequired
	},

	initiatePrivateChat(event){
		event.preventDefault();
		Meteor.call("createPrivateMsgHanger",this.props.user._id,Meteor.userId());
		console.log("private chat initiated with : " + this.props.user._id+ " by " + Meteor.userId());
	},

	render(){
		return(
			<li onClick={this.initiatePrivateChat}>
				{this.props.user.username}
			</li>
		);
	}
});