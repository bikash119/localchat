CommunicatorHanger = React.createClass({
	render(){
		return(
			<div className="well">
				<ul>
					{this.renderCommunicationTab()}
				</ul>
			</div>
		);
	}
});