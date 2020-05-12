import React, { Component } from 'react';
//import { FaHorse } from "react-icons/fa";
import { GiBee } from "react-icons/gi";
import { BsTrash } from "react-icons/bs";
import Moment from 'react-moment';

class ListAppointments extends Component {
	render() {
		return (
			<div className="appointment-list item-list mb-3">
				{this.props.appointments.map(item => (
					<div className="pet-item col media py-3" key={item.aptId}>
						<div className="mr-3">
							<button className="pet-delete btn btn-sm btn-warning"
								onClick={() => this.props.deleteAppointment(item)}
							><BsTrash/></button>
						</div>

						<div className="pet-info media-body">
							<div className="pet-head d-flex">
								<span className="pet-name">{item.petName} <GiBee /></span>
								<span className="apt-date ml-auto">
									<Moment
										date={item.aptDate}
										parse="YYYY-MM-DD hh:mm"
										format="DD.MM.YYYY hh:mm"
									/>

								</span>
							</div>

							<div className="owner-name">
								<span className="label-item">Besitzer: </span>
								<span>{item.ownerName}</span>
							</div>
							<div className="apt-notes">{item.aptNotes}</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default ListAppointments;