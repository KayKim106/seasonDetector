import React from 'react'
import ReactDOM from 'react-dom'

// Component 
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            lat : null,
            errorMessage : '',
        }
    }

    // ComponentDidMount will run after render method excuted
    componentDidMount(){       
       // GeoLocation API 
       window.navigator.geolocation.getCurrentPosition(
        position => this.setState({ lat : position.coords.latitude }),
        err => this.setState({ errorMessage : err.message })
        )
    }

    // ComponentDidUpdate will run after componentDidMount excuted 
    componentDidUpdate(){
        console.log("Update after Did Mount")
    }

    // ComponentWilUnmount can excute when component no nee dto render
    componentWillUnmount(){
        console.log("Component UnMount ")
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error : {this.state.errorMessage}</div>
        }

        if(this.state.lat && !this.state.errorMessage){
            return <SeasonDisplay lat = { this.state.lat }/>
        }

            return <div>
                <Spinner message="Please accept location request"/>
                </div>
    }
    render(){

        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />,document.querySelector('#root'))