TweetBox = React.createClass({

	sendMessage(){

		console.log("message sending to "+Session.get("currentlyCommnunicatingWith"));
		let receivinguser = Session.get("currentlyCommnunicatingWith");
		let message = ReactDOM.findDOMNode(this.refs.messageInput).value.trim();
		console.log(message);
		ReactDOM.findDOMNode(this.refs.messageInput).value="";
		Meteor.call("createMessage",receivinguser,message);
	},
	render(){
		return (
				<div className="col-lg-12 tweetBox">
					<div className="row">
					    <div className="input-group">
						    <input type="text" className="form-control messageBox" placeholder="Type your message here..."
						    ref="messageInput">
						    </input>
					    </div>{/*<!-- /input-group -->*/}
					</div>
					<div className="row clearfix	">
						<div className="btn-group">
  							<button type="button" className="btn btn-primary pull-right" onClick={this.sendMessage}>Action</button>
  						</div>
					</div>
				</div>
			);
	}
});