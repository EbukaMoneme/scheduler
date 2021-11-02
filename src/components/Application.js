import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
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

	//Booking an interview
	function bookInterview(id, interview) {
		console.log("id:", id, "interview:", interview)
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		}
		console.log(appointment)
		const appointments = {
			...state.appointments,
			[id]: appointment
		};
		return axios.put(`/api/appointments/${id}`, appointment)
			.then((res) => {
				console.log('Interview Booked!')
				setState({...state, appointments})
			})
			.catch((err) => console.log("Failed because:", err))
	}

	// Cancel interview

	// Getting daily information - Interviews and Appointments
	const dailyAppointments = getAppointmentsForDay(state, state.day)
	const dailyInterviewers = getInterviewersForDay(state, state.day)
	const parsedAppointments = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		let key = appointment['id']
		return (
			<Appointment 
				{...appointment}
				key={key}
				interview={interview} 
				interviewers={dailyInterviewers}
				bookInterview={bookInterview} 
			/>)
	})

	// Application component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
				<Appointment time={'5pm'}/>
      </section>
    </main>
  );
}
