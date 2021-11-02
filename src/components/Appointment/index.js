import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props)  {
	// State hooks
	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(
		interview? SHOW : EMPTY
	)
	
	//Save function
	function saveApp(name, interviewer) {
		transition(SAVING)
		const interview = {
			student: name,
			interviewer
		};
		bookInterview(id, {...interview})
			.then(() => { transition(SHOW) })
	}

	// Cancel function
	function deleteApp(id) {
		transition(DELETING)
		console.log("Id:", id)
		cancelInterview(id)
			.then(() => { transition(EMPTY) })
	}

  return (
    <article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
			  <Show
			    student={interview.student}
			    interviewer={interview.interviewer}
					onDelete={() => transition(CONFIRM)}
			  />
			)}
			{mode === CREATE && (
				<Form 
					interviewers={interviewers} 
					onSave={(name, interviewer) => {saveApp(name, interviewer)}} 
					onCancel={() => back()} 
				/>
			)}
			{mode === SAVING && <Status message={"Loading"} />}
			{mode === DELETING && <Status message={"Deleting"} />}
			{mode === CONFIRM && (
				<Confirm 
					message={"Are you sure you would like to delete?"} 
					onCancel={() => back()} 
					onConfirm={() => deleteApp(id)} 
				/>)}
    </article>
  )
}