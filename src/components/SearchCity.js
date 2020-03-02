import React from 'react';



class SearchCity extends React.Component {

	state = {
		city:""
	}



	render() {
		return (
			<div id="SearchCity" className="mb-5">
				<h2>Enter the city name</h2>
				<form onSubmit={(e)=>this.props.search(e, this.props.city)}>
					<div className="inputruta">
						
					<input type="text" className="form" id="city" onChange={(e)=>this.props.update(e)} value={this.props.init}/>
						<div className="knappdiv">
							<button type="submit" value="submit" className="btn">Search</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default SearchCity;
