import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import DarkmodeToggle from "./DarkmodeToggle";

const StyleHeadermenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyleHeadermenu>
      <li>
        <ButtonIcon onClick={() => navigate(`/account`)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkmodeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyleHeadermenu>
  );
}

export default HeaderMenu;
