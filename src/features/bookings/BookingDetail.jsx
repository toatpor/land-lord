import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingById } from "./useBookingId";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useBookingDelete";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isPending, data: booking = {} } = useBookingById();
  const { deleteBookingById, isDeleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkOut, isCheckOut } = useCheckOut();
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isPending) return <Spinner />;
  if (!Object.keys(booking)[0]) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open openWindow="deleteBooking">
            <Button $variation="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBookingById(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleteBooking}
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)}>Check out</Button>
        )}
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            disabled={isCheckOut}
          >
            Check-In
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
