import styled from "styled-components";
import { useRecentBooking } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useStayBooking } from "./useStayBooking";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashBoardLayout() {
  const { isPending: isBooking, bookings } = useRecentBooking();
  const { isPending: isStay, stayConfirm, date } = useStayBooking();
  const { isCabinLoad, cabin } = useCabin();

  if (isBooking || isStay || isCabinLoad) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        stayConfirm={stayConfirm}
        bookings={bookings}
        cabin={cabin.length}
        date={date}
      />
      <TodayActivity />
      <DurationChart stayConfirm={stayConfirm} />
      <SalesChart bookings={bookings} date={date} />
    </StyledDashboardLayout>
  );
}

export default DashBoardLayout;
