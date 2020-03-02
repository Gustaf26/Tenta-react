import React from 'react';
import SearchCity from './components/SearchCity';
import WeatherReport from './components/WeatherReport';
import Weathercondtions from './components/weatherconditions'
import axios from 'axios'

class App extends React.Component {
	state = {
		errorMessage: false,
    report: null,
    temp:"",
    city:"",
    humi:"",
    initcity:"",
    conditions:""
    
  }

  componentDidMount() {
    
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Lund&appid=a9f6719e37f20890ebff5d91724dec1f`)
      .then(res => {
        let y = Math.floor(res.data.main.temp -273)
        this.setState({city:'Lund', report:true, humi: res.data.main.humidity, temp: y, initcity: "", conditions: res.data.weather[0].description})
        
      })
  }
  
  searchcity = (e) => {

    e.preventDefault()

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.initcity}&appid=a9f6719e37f20890ebff5d91724dec1f`)
          .then(res=>

            {let t = Math.floor(res.data.main.temp -273)
            this.setState({humi: res.data.main.humidity, temp: t, conditions: res.data.weather[0].description})
            }).catch(err=>{this.setState({report: false})})
      this.setState({city: this.state.initcity, report:true})
      this.setState({initcity: ""})
  }

  updatevalue = (e) => {

    this.setState({initcity: e.target.value})
    
  }

	render() {
		return (
      <div>
        <h1>MY WEATHER APP</h1>
          <div id="app">
          <div className="container my-5">
            <h1 className="text-center mb-5">
              <span role="img" aria-label="Weather?">🌦❔</span>
            </h1>

            <SearchCity search={this.searchcity} city={this.state.city} update={this.updatevalue} init={this.state.initcity}/>
            

            {
              this.state.report
              ? (<div>
                  <WeatherReport cit={this.state.city} hum={this.state.humi} temp={this.state.temp}/>
                  <Weathercondtions cit={this.state.city} cond={this.state.conditions}/>
                </div>
              )
              : <div>SORRY YOUR CITY DOESN´T SEEM TO EXIST</div>
            }
            </div>
			  </div>
      </div>
		)
	}
}

export default App;
