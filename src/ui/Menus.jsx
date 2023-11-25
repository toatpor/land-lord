import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsidelick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = (value) => setOpenId((val) => (val = value));

  return (
    <MenuContext.Provider
      value={{ openId, close, open, setPosition, position }}
    >
      {children}
    </MenuContext.Provider>
  );
}
function Toggle({ id }) {
  const { open, openId, close, setPosition } = useContext(MenuContext);

  function handelClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition(
      (val) =>
        (val = {
          x: window.innerWidth - rect.width - rect.x,
          y: rect.y + rect.height + 8,
        })
    );
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handelClick} className="check">
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id: listId, children }) {
  const { openId, position, close } = useContext(MenuContext);
  const { ref } = useOutsidelick(close, false);

  useEffect(
    function () {
      const handleWhell = function () {
        if (openId) close();
      };
      document.addEventListener("wheel", handleWhell, true);

      return () => {
        document.removeEventListener("wheel", handleWhell, true);
      };
    },

    [close, openId]
  );

  if (openId !== listId) return null;
  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  const handleClick = function () {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
