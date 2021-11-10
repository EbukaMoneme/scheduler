import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props)  {
	// State hooks
	const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
	const { mode, transition, back } = useVisualMode(
		interview ? SHOW : EMPTY
	)
	
	//Save function
	function saveApp(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING)
		bookInterview(id, {...interview})
			.then(() => transition(SHOW))
			.catch(error => transition(ERROR_SAVE, true))
	}

	// Delete function
	function deleteApp(id) {
		transition(DELETING, true)
		cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch(error => transition(ERROR_DELETE, true))
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
					onEdit={() => transition(EDIT)} 
			  />
			)}
			{mode === CREATE && (
				<Form 
					interviewers={interviewers} 
					onSave={saveApp}
					onCancel={back}
				/>
			)}
			{mode === SAVING && <Status message={"Loading"} />}
			{mode === DELETING && <Status message={"Deleting"} />}
			{mode === CONFIRM && (
				<Confirm 
					message={"Are you sure you would like to delete?"} 
					onCancel={back} 
					onConfirm={() => deleteApp(id)} 
				/>)}
			{mode === EDIT && (
				<Form 
					interviewers={interviewers} 
					onSave={saveApp}
					onCancel={back}
					interviewer={interview.interviewer && interview.interviewer.id}
					student={interview.student}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error
					message={"An error occured while saving. Try again."}
					onClose={back}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message={"An error occured while deleting. Try again."}
					onClose={back}
				/>
			)}
    </article>
  )
}