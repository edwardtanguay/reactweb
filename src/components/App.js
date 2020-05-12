import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
// import { isCompositeComponent } from 'react-dom/test-utils';
import { without } from 'lodash';

class App extends Component {
	constructor() {
		super();
		this.state = {
			location: "Berlin",
			appointments: [],
			formDisplay: false,
			lastIndex: 0
		}
		this.deleteAppointment = this.deleteAppointment.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
		this.addAppointment = this.addAppointment.bind(this);
	}

	toggleForm() {
		this.setState({
			formDisplay: !this.state.formDisplay
		});
	}

	addAppointment(apt) {
		let tempApts = this.state.appointments;
		apt.aptId = this.state.lastIndex;
		tempApts.unshift(apt);

		this.setState({
			appointments: tempApts,
			lastIndex: this.state.lastIndex + 1
		})
	}

	deleteAppointment(apt) {
		let tempApts = this.state.appointments;
		tempApts = without(tempApts, apt);

		this.setState({
			appointments: tempApts
		})

	}

	componentDidMount() {
		fetch('./data.json')
			.then(response => response.json())
			.then(result => {
				const apts = result.map(item => {
					item.aptId = this.state.lastIndex;
					this.setState({ lastIndex: this.state.lastIndex + 1 });
					return item;
				})
				this.setState({
					appointments: apts,
					version: '0.0.7'
				})
			})
	}
	render() {
		return (
			<div>
				<header class="container text-white">
					<div className="row py-4">
						<h4>Das Wundertier - Ihr Tierarzt</h4><p class="ml-2"> version {this.state.version}</p>
					</div>
				</header>
				<main className="page bg-white" id="petratings">
					<div className="container">
						<div className="row">
							<div className="col-md-12 bg-white">
								<div className="container">
									<AddAppointments formDisplay={this.state.formDisplay}
										toggleForm={this.toggleForm}
										addAppointment={this.addAppointment}
									/>
									<SearchAppointments />
									<ListAppointments appointments={this.state.appointments}
										deleteAppointment={this.deleteAppointment}
									/>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default App;
