import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBooking";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function BookingTable() {
  //sorting and filter before get api call
  //server side rending
  const { isPending, bookings, count } = useBooking();
  // if (!bookings.length) return <Empty resource="bookings" />;
  if (isPending) return <Spinner />;
  if (!bookings.length) return <Empty />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        {/* {bookings.map((value) => (
          <BookingRow key={value.id} booking={value} />
        ))} */}

        <Table.Footer>
          <Pagination bookingAmount={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
