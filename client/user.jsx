User = React.createClass({

	propTypes:{
		user:React.PropTypes.object.isRequired
	},

	initiatePrivateChat(event){
		event.preventDefault();
		console.log("private chat initiated : " + this.props.user._id);
	},

	render(){
		return(
			<li onClick={this.initiatePrivateChat}>
				{this.props.user.username}
			</li>
		);
	}
});