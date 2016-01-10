MessageContainer = React.createClass({

	mixins:[ReactMeteorData],

	componentDidUpdate(){
		let node = ReactDOM.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},

	getMeteorData(){
		let messageSubscriptionHandler = Meteor.subscribe("messages");
		let activeUserSubscriptionHandler = Meteor.subscribe("activeUsers");
		let showMessageFor = Session.get("currentlyCommnunicatingWith");

		let messages = undefined;

		if(!showMessageFor && activeUserSubscriptionHandler.ready()){
			showMessageFor = ActiveUsers.findOne({"user.username":"public"}).userId;
		}	
		messages = Messages.find({$and:[
			{$or:[{"recipient.userId" : showMessageFor},{"sender.userId":showMessageFor}]},
			{$or:[{"recipient.userId" : Meteor.userId()},{"sender.userId":Meteor.userId()}]}
			]},{$sort:{createdOn:-1}}).fetch();
		let publicUser = ActiveUsers.findOne({"user.userId":showMessageFor});
		if(publicUser && publicUser.user.username=="public"){
			messages = Messages.find({"recipient.userId" : showMessageFor},{$sort:{createdOn:-1}}).fetch();
		}
		console.log(messages);
		return{
			messages:messages
		}
	},

	renderMessages(){

		let messagesForCurrentUser = this.data.messages;
		if(messagesForCurrentUser){
			return(
					messagesForCurrentUser.map((elem)=>{return <MessageListItem key={elem._id} message={elem}/> })
				);
			}else{
				return(<span></span>);
			}
	},

	render(){
		return(
				<div className="row" id="messageContainer">
					<ul className="list-unstyled message-margin">
						{this.renderMessages()}
					</ul>
				</div>
			);
	}
});

MessageListItem = React.createClass({
	render(){
		return(
				<li><Emojione text={this.props.message.message} className="clearfix"/></li>
			);
	}
});