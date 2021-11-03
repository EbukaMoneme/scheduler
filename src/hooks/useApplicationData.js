import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	})
	
	const setDay = day => setState({ ...state, day });
	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers')
		]).then((all) => {
			const setNewState = (days, appointments, interviewers) => setState(prev => ({ ...prev, days, appointments, interviewers }));
			setNewState(all[0].data, all[1].data, all[2].data)
		});
	}, [])

	function updateDailySpots(updatedAppointments) {
		return state.days.map(eachDay => {
			let freeSpots = 0;
			for (let appointmentId of eachDay.appointments) {
				if (!updatedAppointments[appointmentId].interview) {
					freeSpots ++;
				}
			}
			return { ...eachDay, spots: freeSpots }
		})
	};
	
	//Book interview
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		}
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		return axios.put(`/api/appointments/${id}`, appointment)
			.then((res) => {
				console.log('Interview Booked!')
				setState({...state, appointments, days: updateDailySpots(appointments)})
			})
			.catch((err) => { throw err })
	}
	
	// Cancel interview
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null
		}
		const appointments = {
			...state.appointments,
			[id]: appointment
		}
		return axios.delete(`/api/appointments/${id}`)
			.then((res) => {
				console.log('Interview Deleted!')
				setState({...state, appointments, days: updateDailySpots(appointments)})
			})
			.catch((err) => { throw err })
	}

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview
	}
}