import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

function Logout() {
  const { userLogout, isLogOut } = useLogout();
  return (
    <ButtonIcon onClick={() => userLogout()} disabled={isLogOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
