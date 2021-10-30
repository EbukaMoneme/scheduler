import { useState } from "react";

export default function useVisualMode(initialMode) {
	const [mode, setMode] = useState(initialMode);
	const [history, setHistory] = useState([initialMode])

	function transition(next, replace = false) {
    if (replace === true) {
      back()
      setMode(next)
    } else {
			setMode(next)
		}
    history.push(next)
		setHistory(history)
  }
	
	function back() {
		if (history.length > 1) {
			history.pop()
			const mode = history[history.length - 1]
			setMode(mode)
		}
	}

	return { mode, transition, back }
}
