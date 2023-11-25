import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";
function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckOut } = useCheckOut();
  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
