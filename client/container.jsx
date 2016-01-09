ChatContainer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let handle = Meteor.subscribe("activeUsers");
		return{
			currentActiveUsers:ActiveUsers.find(
				{$and: [ {userId:{$ne:Meteor.userId()}},{username:{$ne:"public"}} ]}
				).fetch(),
			handle:handle
		};
	},

	getCurrentActiveUsers(){
		if(this.data.handle.ready()){
			return this.data.currentActiveUsers.map((user) => {
				return <User key={user._id} user={user} />
			}); 
		}
	},

	renderCommunicationHanger(){
		return <CommunicatorHanger />;
	},

	renderTweetBox(){
		return <TweetBox />;
	},

	render(){
		return(
			<div className="container">
				<div className="container-fluid">
				  <div className="row">
				  	<div className="col-xs-1 col-md-2 col-lg-3 columnBorder">
				  		<ul>
				  			{this.getCurrentActiveUsers()}
				  		</ul> 
				  	</div>
				  	<div className="col-xs-11 col-md-10 col-lg-9 columnBorder">
			  			{this.renderCommunicationHanger()}
			  			<div className="container" id="messageContainer">
			  			</div>
			  			{this.renderTweetBox()}
				  	</div>
				  </div>
				</div>
			</div>
			);
	}
});