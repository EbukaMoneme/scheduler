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

export function getInterview(state, interview) {
	const result = interview
	const interviewers = state.interviewers
	if (!result) {
		return result
	}
	const key = result.interviewer
	result.interviewer = interviewers[key]
	return result;
}