import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  > header {
    width: 100%;
    height: 144px;
    background-color: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        height: 24px;
        width: 24px;
        color: #999591;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: -100px 0;

  width: 100%;
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromBottom} 1s;

  form {
    margin: 32px 0;
    width: 340px;
    align-self: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
    }

    *[name='old_password'] {
      margin-top: 24px;
    }
  }

  > a {
    color: #ff9900;
    display: block;
    margin-top: 24px;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#FF9900')};
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    background-color: #ff9000;
    border: 0;
    height: 48px;
    width: 48px;
    border-radius: 50%;

    position: absolute;
    right: 6px;
    bottom: 6px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      color: #312e38;
      width: 20px;
      height: 20px;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;
