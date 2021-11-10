import { useState } from "react";

export default function useVisualMode(initialMode) {
	const [history, setHistory] = useState([initialMode])

	function transition(mode, replace = false) {
		// set history with ternary operator, if true, override current mode, else add mode to history
		setHistory(prevHistory => replace === true ? [...prevHistory.slice(0, prevHistory.length - 1), mode]: [...prevHistory, mode])
  }
	
	function back() {
		if (history.length < 2) {
			return
		}
		// set history as last history without ending value
		setHistory(prevHistory => [...prevHistory.slice(0, prevHistory.length - 1)])
	}
	// mode always sent back as last value of history
	return { mode:history[history.length - 1], transition, back }
}
