import styled from "styled-components";
import TodayItem from "./TodayItem";

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
function TodayLists({ data }) {
  return (
    <TodayList>
      {data.map((val) => (
        <TodayItem data={val} key={val.id} />
      ))}
    </TodayList>
  );
}

export default TodayLists;
