import React from 'react';
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected ": selected,
    "day-list__item--full": !spots
  })

  const formatSpots = spots? spots === 1? "1 spot remaining" : `${spots} spots remaining` : 'no spots remaining';
  
  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots}</h3>
    </li>
  );
}