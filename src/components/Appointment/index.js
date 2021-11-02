import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props)  {
	// State hooks
	const { id, time, interview, interviewers, bookInterview } = props;
	const { mode, transition, back } = useVisualMode(
		interview? SHOW : EMPTY
	)
	
	//Save function
	function save(name, interviewer) {
		transition(SAVING)
		const interview = {
			student: name,
			interviewer
		};
		bookInterview(id, {...interview})
			.then(() => { transition(SHOW) })
	}

  return (
    <article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
			  <Show
			    student={interview.student}
			    interviewer={interview.interviewer}
			  />
			)}
			{mode === CREATE && (
				<Form 
					interviewers={interviewers} 
					onSave={(name, interviewer) => {
						save(name, interviewer)
						
					}} 
					onCancel={() => back()} 
				/>
			)}
			{mode === SAVING && <Status message={"Loading"} />}
    </article>
  )
}