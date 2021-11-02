import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
	const { interviewers, onSave, onCancel} = props;
	const [student, setStudent] = useState(props.student || "")
	const [interviewer, setInterviewer] = useState(props.interviewer || null)

	const reset = () => {
		setInterviewer("");
		setStudent("");
	}
	const cancel = () => {
		reset()
		onCancel()
	}
	return (
		<main className="appointment__card appointment__card--create">
		  <section className="appointment__card-left">
		    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
		      <input
		        className="appointment__create-input text--semi-bold"
		        name="name"
		        type="text"
		        placeholder="Enter Student Name"
						onChange={(event) => setStudent(event.target.value)}
		        value={student}
		      />
		    </form>
		    <InterviewerList 
		      interviewers={interviewers}
					value={interviewer}
					onChange={setInterviewer}
		    />
		  </section>
		  <section className="appointment__card-right">
		    <section className="appointment__actions">
		      <Button danger onClick={cancel}>Cancel</Button>
		      <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button>
		    </section>
		  </section>
		</main>
	)
}