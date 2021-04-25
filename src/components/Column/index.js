import * as React from 'react';
import PropTypes from 'prop-types';
import 'styled-components/macro';

import { BoardContext } from '../../context/BoardContext';
import { addEntryLocalStorage } from "../../utils/localStorage";
import Ticket from '../Ticket';
import styles from './styles';

// the function destructures the properties ie. gets the values passed in the properties
const Column = ({ title, columnId, items, onDragStart, onDragOver, onDrop, parentCallback }) => {
  //keyLocalStorage is stored in the context which is a global state management system built into react... The synthax below destructures keyLocalStorage from context
  const { keyLocalStorage } = React.useContext(BoardContext);

  // This is a local state whos initial value is items... the setTickets is a function that cahnges the value of tickets
  const [tickets, setTickets] = React.useState(items);

  function handleSubmit(event) {
    // this prvents the default behaviour of form submit which refreshes the page
    event.preventDefault();
    const { newTicket: ticket } = event.target.elements;

    if (ticket.value) {
      const id = Math.floor(Math.random() * Math.floor(2345687));
      addEntryLocalStorage(keyLocalStorage, id, ticket.value, columnId);
      setTickets([...tickets, { id, title: ticket.value, column: columnId }]);
      parentCallback({ id, title: ticket.value, column: columnId });
      ticket.value = '';
    }
  }

  // This runs each time the items changes
  React.useEffect(() => {
    setTickets(items);
  }, [items]);

  return (
    <div css={styles} onDragOver={onDragOver} onDrop={e => onDrop(e, columnId)}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <Ticket key={ticket.id} data={ticket} onDragStart={onDragStart} />
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          <input name="newTicket" type="text" aria-label="New ticket" />
        </div>
        <div>
          <button type="submit">Add card</button>
        </div>
      </form>
    </div>
  );
};

// THESE ARE DEFAULT PROP TYPES ----> this means that by default, these properties would be empty funtions
Column.defaultProps = {
  onDragStart: () => { },
  onDragOver: () => { },
  onDrop: () => { },
  parentCallback: () => { },
};

// THESE IS THE PROP TYPE -----> Which specifies the type of data that is to be received... so a wrong data type isn't passed...
// for example, columnId is a required number... so if a string is passed, react would through an error. The .isRequired makes sure that property is passed.
Column.propTypes = {
  title: PropTypes.string.isRequired,
  columnId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      column: PropTypes.number,
    }),
  ).isRequired,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default Column;
