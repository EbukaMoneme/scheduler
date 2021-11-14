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
			result.push(appointments[app])
		})
		return result
	}
}

export function getInterviewersForDay(state, day) {
	const days = state.days;
	const interviewers = state.interviewers;
	if (days) {
		const chosenDay = days.filter(dayX => dayX.name === day)
		if (chosenDay.length === 0) {
			return chosenDay;
		}
		const daysInterviewers = chosenDay[0].interviewers
		const result = [];
		daysInterviewers.forEach(interviewer => {
			result.push(interviewers[interviewer])
		})
		return result
	}
}

export function getInterview(state, interview) {
	const interviewers = state.interviewers
	if (!interview) return interview
	const key = interview.interviewer
	const interviewObject = {
		student: interview.student,
		interviewer: interviewers[key]
	}
	return interviewObject;
}