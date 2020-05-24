import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      size: 20;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img {
    height: 56px;
    width: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    color: #ff9000;
    display: flex;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background-color: #ff9000;
      margin: 0 8px;
      display: flex;
      align-items: center;
    }
  }
`;

export const NextSchedule = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background-color: #3e3b47;
    border-radius: 10px;
    margin-top: 24px;
    padding: 16px 24px;
    display: flex;
    align-items: center;

    position: relative;

    ::before {
      content: '';
      height: 80%;
      width: 2px;
      background-color: #ff9000;
      position: absolute;
      left: 0;
      top: 10%;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #f4ede8;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    font-size: 20px;
    line-height: 26px;
    font-weight: 400;
    color: #999591;

    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  div + & {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;

    margin-left: 24px;
    padding: 16px;

    background: #3e3b47;
    border-radius: 10px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 16px;
      color: #f4ede8;
    }
  }
`;

export const Calendar = styled.aside`
  width: 360px;
  box-sizing: border-box;

  .DayPicker {
    background-color: #28262e !important;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    box-sizing: border-box;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled),
  .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--today:not(.DayPicker-Day--selected) {
    color: #ff9000 !important;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  .DayPicker-Caption div {
    text-align: center;
  }

  .DayPicker-NavButton {
    color: #999591;
  }

  .DayPicker-NavButton.DayPicker-NavButton--prev {
    left: 1.5em;
  }
`;
