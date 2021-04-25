import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BoardContextProvider from '../../context/BoardContext';
import Column from '.';

const mockTickets = [
  { id: 1, title: 'test', column: 3 },
  { id: 2, title: 'test test', column: 2 },
];

describe('Column', () => {
  test('clicking Add adds a new ticket in the column', () => {
    render(
      <BoardContextProvider value={{ keyLocalStorage: 'test-key' }}>
        <Column items={mockTickets} columnId={2} title="To do" />
      </BoardContextProvider>,
    );

    const newCardTitle = 'new card';
    userEvent.type(screen.getByRole('textbox'), newCardTitle);

    const addButton = screen.getByRole('button', { name: /add card/i });
    userEvent.click(addButton);

    let lastCardInColumn = screen.getAllByTitle(/ticket/i).slice(-1)[0];
    expect(lastCardInColumn).toHaveTextContent(newCardTitle);
  });

  test('clicking Add without typing first does not add new card', () => {
    render(
      <BoardContextProvider value={{ keyLocalStorage: 'test-key' }}>
        <Column items={mockTickets} columnId={2} title="To do" />
      </BoardContextProvider>,
    );

    let lastCardInColumn = screen.getAllByTitle(/ticket/i).slice(-1)[0];
    const addButton = screen.getByRole('button', { name: /add card/i });
    userEvent.click(addButton);

    let newLastCardInColumn = screen.getAllByTitle(/ticket/i).slice(-1)[0];
    expect(lastCardInColumn).toStrictEqual(newLastCardInColumn);
  });
});
