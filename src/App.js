import React from 'react';
import SearchCity from './components/SearchCity';
import WeatherReport from './components/WeatherReport';
import axios from 'axios'

class App extends React.Component {
	state = {
		errorMessage: false,
    report: null,
    temp:"",
    city:"",
    humi:"",
    
  }

  componentDidMount() {
    
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Lund&appid=a9f6719e37f20890ebff5d91724dec1f`)
      .then(res => {
        let t;
        t = Math.floor(res.data.main.temp -273)
        this.setState({city:'Lund', report:true, humi: res.data.main.humidity, temp: t})
        const persons = res.data;
        console.log(persons)
      })
  }
  
  searchcity = (e, city) => {

    e.preventDefault()

    this.setState({city: city})

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9f6719e37f20890ebff5d91724dec1f`)
          .then(res=>

            {let t;
             t = Math.floor(res.data.main.temp -273)
            this.setState({report:true, humi: res.data.main.humidity, temp: t})
            })
  
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

            <SearchCity search={this.searchcity}/>

            {
              this.state.report
              ? (
                <WeatherReport cit={this.state.city} hum={this.state.humi} temp={this.state.temp}/>
              )
              : ''
            }
            </div>
			  </div>
      </div>
		)
	}
}

export default App;
