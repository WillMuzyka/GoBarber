import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  loading?: number;
}

const rotation = keyframes`
  100% {
    transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-tranform: rotate(360deg);
  }
`;

export const Container = styled.button<ButtonProps>`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#FF9900')};
  }

  svg {
    ${(props) =>
      !!props.loading &&
      css`
        animation: ${rotation} 2s linear infinite;
      `}
    margin-right: 8px;
  }
`;
