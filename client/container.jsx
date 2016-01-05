ChatContainer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return{
			currentActiveUsers:ActiveUsers.find({}).fetch(),
		};
	},

	getCurrentActiveUsers(){
		return this.data.currentActiveUsers.map((user) => {
			return <User key={user._id} user={user} />
		}); 
	},

	renderCommunicationHanger(){
		return <CommunicatorHanger />;
	},

	renderMessageContainer(){

	},

	renderTweetBox(){

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
			  			{this.renderMessageContainer()}
			  			{this.renderTweetBox()}
				  	</div>
				  </div>
				</div>
			</div>
			);
	}
});

