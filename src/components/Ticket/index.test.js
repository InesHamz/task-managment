import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import BoardContextProvider from '../../context/BoardContext';
import Ticket from '.';

const mockTicket = { id: 1171906, title: 'test', column: 3 };

describe('Ticket', () => {
  test('should match the snapshot', () => {
    const tree = render(
      <BoardContextProvider value={{ keyLocalStorage: 'test-key' }}>
        <Ticket data={mockTicket} />
      </BoardContextProvider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('clicking edit button allows typing in textarea and saving the new text', () => {
    render(
      <BoardContextProvider value={{ keyLocalStorage: 'test-key' }}>
        <Ticket data={mockTicket} />
      </BoardContextProvider>,
    );

    let initialMessage = mockTicket.title;
    const editButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(editButton);

    const textarea = screen.getByRole('textbox');
    let extraMessage = ' new';
    userEvent.type(textarea, extraMessage);
    expect(textarea).toHaveValue(`${initialMessage}${extraMessage}`);

    const saveButton = screen.getByRole('button', { name: /save card/i });
    userEvent.click(saveButton);

    let finalMessage = screen.getByTitle(/ticket/i);
    expect(finalMessage).toHaveTextContent(`${initialMessage}${extraMessage}`);
  });
});
