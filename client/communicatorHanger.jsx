CommunicatorHanger = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		let handle = Meteor.subscribe("privateMessageHangers");
		let privateCommunicator = PrivateMessageHangers.findOne({userId:Meteor.userId()});
		let communicatingWith = null;
		if(privateCommunicator){
			communicatingWith = privateCommunicator.communicatingWith;
		}
		return{
			privateCommunicators:communicatingWith,
			handle : handle
		};
	},

	renderCommunicationTabContainer(){
		if(this.data.handle.ready()){
			return this.data.privateCommunicators.map((comm) => {
				return <CommunicationTab key={comm} commTab={comm}/>
			});	
		}
		
	},

	render(){
		return(
			<ul className="nav nav-tabs" role="tablist">
				{this.renderCommunicationTabContainer()}
			</ul>
		);
	}
});

CommunicationTab = React.createClass({

	renderMessageContainer(){
		console.log("message handler");
		ReactDOM.render(<MessageContainer /> , document.getElementById("messageContainer"));
	},

	render(){
		return (		
			<li role="presentation" onClick={this.renderMessageContainer}>
				<a href="#" aria-controls="home" role="tab" data-toggle="tab">{this.props.commTab}</a>
			</li>
			);
	}
});

MessageContainer = React.createClass({
	render(){
		return ( <p>Message should appear here</p>);
	}
});