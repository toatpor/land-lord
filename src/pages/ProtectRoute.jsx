import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//try to connect to root url will go to dashboard route but it stuck by ProtectRoute
//will call useQuery to fetch user data but get return null there is no session in there
function ProtextRoute({ children }) {
  //useNaviate allow only inside other function or useEffect not top level of component
  const navigate = useNavigate();
  // 1.Load the authenticated user
  const { isPending, isAuthenticated, fetchStatus } = useUser();

  // if there have not login or pass authentication will get redirect to login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isPending, isAuthenticated, navigate, fetchStatus]
  );

  // 2.while is load show spinner
  if (isPending)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  //3. if there no authenticated user, diret to login page
  if (isAuthenticated) return children;
}

export default ProtextRoute;
