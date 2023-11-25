import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ data }) {
  const { id, status, guest, numNights } = data;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag $type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag $type="blue">Depature</Tag>}
      <Flag src={guest.countryFlag} alt={`Flag of ${guest.countryFlag}`} />
      <Guest>{guest.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && (
        <CheckoutButton bookingId={id}>Check Out</CheckoutButton>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
