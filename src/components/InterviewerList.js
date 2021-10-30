import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props; 
  const parsedInterviewerList = interviewers.map(interviewer => {
  return (
		<InterviewerListItem 
			key={interviewer.id} 
			setInterviewer={() => onChange(interviewer.id)} 
			selected={interviewer.id === value} 
			{...interviewer}
		/>
	)})
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewerList}
      </ul>
    </section>
  )
}