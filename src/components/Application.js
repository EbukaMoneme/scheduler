import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
	const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData();

	// Getting daily information - Interviews and Appointments
	const dailyInterviewers = getInterviewersForDay(state, state.day)
	const dailyAppointments = getAppointmentsForDay(state, state.day)
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
				cancelInterview={cancelInterview} 
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
				<Appointment key="last" time={'5pm'}/>
      </section>
    </main>
  );
}
