import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
// import { isCompositeComponent } from 'react-dom/test-utils';
import { without, findIndex } from 'lodash';

class App extends Component {
	constructor() {
		super();
		this.state = {
			location: "Berlin",
			appointments: [],
			formDisplay: false,
			lastIndex: 0,
			orderBy: 'aptDate',
			orderDir: 'asc',
			searchText: ''
		}
		this.deleteAppointment = this.deleteAppointment.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
		this.addAppointment = this.addAppointment.bind(this);
		this.changeOrder = this.changeOrder.bind(this);
		this.searchApts = this.searchApts.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
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

	changeOrder(order, dir) {
		this.setState({
			orderBy: order,
			orderDir: dir
		});
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
					version: '1.0.2'
				})
			})
	}

	searchApts(searchText) {
		this.setState({
			searchText: searchText
		})
	}

	updateInfo(fieldName, changedText, id) {
		let tempApts = this.state.appointments;
		let aptIndex = findIndex(this.state.appointments, {
			aptId: id
		});
		tempApts[aptIndex][fieldName] = changedText;
		this.setState({
			appointments: tempApts
		})
	}

	render() {

		let order = 1;
		let filteredApts = this.state.appointments;
		if (this.state.orderDir === 'asc') {
			order = 1;
		} else {
			order = -1;
		}

		filteredApts = filteredApts.sort((a, b) => {
			if (
				a[this.state.orderBy].toLowerCase() <
				b[this.state.orderBy].toLowerCase()
			) {
				return -1 * order;
			} else {
				return 1 * order;
			}
		}).filter(m =>
			m['petName']
				.toLowerCase()
				.includes(this.state.searchText.toLowerCase()) ||
			m['ownerName']
				.toLowerCase()
				.includes(this.state.searchText.toLowerCase()) ||
			m['aptNotes']
				.toLowerCase()
				.includes(this.state.searchText.toLowerCase())
		);

		return (
			<div>
				<header className="container text-white">
					<h4 className="pt-3 pb-0">Das Wundertier - Ihr Tierarzt</h4><p className="font-italic">Version {this.state.version}</p>
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
									<SearchAppointments
										appointments={filteredApts}
										orderBy={this.state.orderBy}
										orderDir={this.state.orderDir}
										changeOrder={this.changeOrder}
										searchApts={this.searchApts}
									/>
									<ListAppointments appointments={filteredApts}
										deleteAppointment={this.deleteAppointment}
										updateInfo={this.updateInfo}
									/>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div >
		)
	}
}

export default App;
