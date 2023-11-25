import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingById } from "../bookings/useBookingId";
import { useParams } from "react-router-dom";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [paidOrNot, setPaidOrNot] = useState(false);
  const [breakFast, setBreakFast] = useState(false);
  const moveBack = useMoveBack();
  const { id } = useParams();
  const { isPending, data: booking = {} } = useBookingById(id);
  const { updateCheckIn, isCheckIn } = useCheckIn();
  const { settingLoad, settingData = {} } = useSetting();

  useEffect(
    function () {
      setPaidOrNot(booking?.isPaid ?? false);
    },
    [booking.isPaid]
  );

  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuest,
    hasBreakfast,
    numNights,
  } = booking;

  const culculateBrefastPrice =
    settingData.breakfastPrice * numGuest * numNights;

  function handleCheckin() {
    if (!paidOrNot) return;

    if (breakFast) {
      updateCheckIn({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: culculateBrefastPrice,
          totalPrice: culculateBrefastPrice + totalPrice,
        },
      });
    } else {
      updateCheckIn({ id, breakFast: {} });
    }
  }

  if (isPending || settingLoad) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={breakFast}
            onChange={() => {
              setBreakFast((value) => !value);
              setPaidOrNot(false);
            }}
          >
            Want to add breakfast for {formatCurrency(culculateBrefastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={paidOrNot}
          disabled={paidOrNot || isCheckIn}
          id={"confirm"}
          onChange={() => setPaidOrNot((value) => !value)}
        >{`I confirm that ${guest.fullName} has paid the total amount of ${
          !breakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + culculateBrefastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                culculateBrefastPrice
              )})`
        }`}</Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!paidOrNot || isCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
