import * as React from 'react';
import PropTypes from 'prop-types';
import 'styled-components/macro';

import { updateEntryLocalStorage } from '../../utils/localStorage';
import styles from './styles';
import { BoardContext } from '../../context/BoardContext';

const Ticket = ({ data, onDragStart }) => {
  const [ticket, setTicket] = React.useState(data);
  const [hasEditModeOn, setHasEditModeOn] = React.useState(false);
  const { keyLocalStorage } = React.useContext(BoardContext);

  function handleEdit(event) {
    event.preventDefault();

    const newTitle = event.target.elements.ticketEdit.value;
    updateEntryLocalStorage(keyLocalStorage, ticket, newTitle);

    setTicket({ ...ticket, title: newTitle });
    setHasEditModeOn(false);
  }

  React.useEffect(() => {
    setTicket(data);
  }, [data]);

  return (
    <div
      css={styles}
      key={ticket.id}
      draggable={!hasEditModeOn}
      onDragStart={e => onDragStart(e, ticket.id)}
    >
      {!hasEditModeOn && ticket && <span title="ticket">{ticket.title}</span>}
      {hasEditModeOn && (
        <form onSubmit={handleEdit}>
          <div>
            <textarea id="ticket-edit-field" name="ticketEdit" type="text" defaultValue={ticket.title} />
          </div>
          <div>
            <button type="edit">Save card</button>
          </div>
        </form>
      )}
      {!hasEditModeOn && <button onClick={() => setHasEditModeOn(true)}>Edit</button>}
    </div>
  );
};

Ticket.defaultProps = {
  onDragStart: () => {},
};

Ticket.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    column: PropTypes.number,
  }).isRequired,
  onDragStart: PropTypes.func,
};

export default Ticket;
