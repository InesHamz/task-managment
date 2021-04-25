import * as React from 'react';
import PropTypes from 'prop-types';
import 'styled-components/macro';

import { BoardContext } from '../../context/BoardContext';
import { useLocalStorageState } from '../../utils/localStorage';
import Column from '../Column';
import styles from './styles';

const Board = ({ columns, defaultData }) => {
  const { keyLocalStorage } = React.useContext(BoardContext);
  const [tickets, setTickets] = useLocalStorageState(keyLocalStorage, defaultData);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const onDrop = (e, columnId) => {
    const id = e.dataTransfer.getData('id');

    const droppedTickets = tickets.filter(ticket => {
      if (ticket.id === parseInt(id)) {
        ticket.column = columnId;
      }
      return ticket;
    });

    setTickets(droppedTickets);
  };

  const updateTickets = ticket => {
    setTickets([...tickets, ticket]);
  };

  return (
    <div css={styles}>
      {columns.map(column => (
        <Column
          key={column.id}
          columnId={column.id}
          title={column.title}
          items={tickets.filter(ticket => ticket.column === column.id)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          parentCallback={updateTickets}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
  defaultData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        column: PropTypes.number,
      }),
  ).isRequired,
};

export default Board;
