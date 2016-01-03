ChatContainer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return{
			currentActiveUsers:ActiveUsers.find({}).fetch()
		};
	},

	getCurrentActiveUsers(){
		return this.data.currentActiveUsers.map((user) => {
			return <User key={user._id} user={user} />
		}); 
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
				  </div>
				</div>
			</div>
			);
	}
});

