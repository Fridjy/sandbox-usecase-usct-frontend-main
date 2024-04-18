import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RPCContext } from "../rpc";
import { getRole } from "./user";

export const useAuthentication = () => {
  const navigate = useNavigate();
  const rpc = useContext(RPCContext);

  const login = async (username?: string) => {
      try {
        if (username)
          fetch('/api/login', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              'username': username,
              'password': 'password',
          })
        }).then(async () => {
          window.location.replace("/driver-poc");
        });
        else {
          const roles = await rpc.getRoles();
          window.location.replace("/driver-poc");
        }
    } catch (e) {
        if (username) navigate('/driver-poc/login');
        else window.location.replace(`/api/oauth2/authorization/esignet`);
      }
    };

  const logout = async () => {
    try {
      await fetch(`/api/logout`, { credentials: "include" });
    } finally {
      sessionStorage.removeItem("user");
      navigate("/driver-poc/login");
    }
  };
  const isAuthenticated = () => {
    return !!getRole();
  };

  return { login, isAuthenticated, logout } as const;
};
