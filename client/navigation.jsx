Navigation = React.createClass({
	render(){
		return(
			<nav className="navbar navbar-default">
  				<div className="container-fluid">
    			{/*	Brand and toggle get grouped for better mobile display */}
    				<div className="navbar-header">
					    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					      	<span className="sr-only">Toggle navigation</span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					    </button>
      					<a className="navbar-brand" href="#">LocalChat</a>
    				</div> {/*//	navbar header */}
    				<ul className="nav navbar-nav navbar-right">
    					<AccountUIComponent />
    				</ul>

    			{/*//	 Collect the nav links, forms, and other content for toggling*/}
				    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				      <ul className="nav navbar-nav">
				        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
				        <li><a href="#">Link</a></li>
				      </ul>
				    </div>{/*//	/.navbar-collapse */}
  				</div>{/*//	/.container-fluid */}
			</nav>
			);
	}
});


AccountUIComponent = React.createClass({
	componentDidMount(){
		this.view = Blaze.render(Template._loginButtons,ReactDOM.findDOMNode(this.refs.container));
	},

	componentWillUnmount(){
		Blaze.remove(this.view);
	},
	render(){
		return <span ref="container"></span>
	}
});