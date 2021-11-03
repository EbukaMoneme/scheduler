import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const  { days, onChange, value } = props;
  const parsedDayList = days.map(day => (
		<DayListItem 
			{...day}
			key={day.id} 
			selected={day.name === value} 
			setDay={onChange} 
		/>
	));
  return (
    <ul>
      {parsedDayList}
    </ul>
  )
}