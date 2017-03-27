import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Images from '../components/Images'

class App extends Component {
	render(){
		return (
			<div>
			    This is React app.
			    <Images />
			</div>

		)
	}

}

ReactDom.render(<App />, document.getElementById('root'))