import * as React from 'react'

export const BoardContext = React.createContext();

const BoardContextProvider = (props) => {
    const value = { keyLocalStorage: 'board-1-tickets' }

    return (
        <BoardContext.Provider value={value} {...props} />
    );
};

export default BoardContextProvider;