import { css } from 'styled-components';

export default css`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  cursor: grab;
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  
  button {
    :hover {
      cursor: pointer;
    }
  }
`;