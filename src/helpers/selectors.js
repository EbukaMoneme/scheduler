import React from "react";

export function getAppointmentsForDay(state, day) {
	const days = state.days
	const appointments = state.appointments
	if (days) {
		const chosenDay = days.filter(dayX => dayX.name === day)
		if (chosenDay.length === 0) {
			return chosenDay;
		}
		const daysApps = chosenDay[0].appointments
		const result = [];
		daysApps.forEach(app => {
			result.push(appointments[String(app)])
		})
		return result
	}
}