import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function stats({ stayConfirm, bookings, date, cabin }) {
  const numberOfBooking = bookings.length;
  const sale = bookings.reduce((acc, val) => (acc += val.totalPrice), 0);
  const checkIn = stayConfirm.length;

  // get percentage guset check-in to hotel
  //get all night guest stay / all cabin that we have * day that we want to compute, will get percentage of booking
  const occupencyRate =
    stayConfirm.reduce((acc, val) => (acc += val.numNights), 0) /
    (date * cabin);

  //  all check-in and stay
  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        value={numberOfBooking}
      />
      <Stat
        color="green"
        title="Sales"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sale)}
      />
      <Stat
        color="indigo"
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        value={checkIn}
      />
      <Stat
        color="yellow"
        title="Occpancy rate"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupencyRate * 100) + "%"}
      />
    </>
  );
}

export default stats;
