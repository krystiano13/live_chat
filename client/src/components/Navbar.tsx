import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  loggedIn: boolean;
  setOwner: (owner: string) => void;
  setAccessToken: (token: string) => void;
  setLoggedIn: (value: boolean) => void;
  accessToken: string;
}

export const Navbar: React.FC<Props> = ({
  loggedIn,
  setOwner,
  setAccessToken,
  setLoggedIn,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    setAccessToken("");
    setOwner("");
    setLoggedIn(false);
    localStorage.removeItem("refresh_token");
  };

  const auth = () => {
    if (!localStorage.getItem("refresh_token")) {
      logout();
      return;
    }
    fetch("http://127.0.0.1:3000/users/tokens/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("refresh_token") as string
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setLoggedIn(true);
          setAccessToken(data.token);
          setOwner(data.resource_owner.email);
          localStorage.setItem("refresh_token", data.refresh_token);
          navigate("/");
        }
      });
  };

  useEffect(auth, []);

  return (
    <nav className="fixed p-5">
      <section
        id="navigation"
        className="relative flex gap-5 items-center justify-start"
      >
        <NavLink to="/">
          <h1 className="font-bold text-xl text-white cursor-pointer">
            LiveChat
          </h1>
        </NavLink>
        {loggedIn && (
          <>
            <NavLink className="text-white font-medium text-lg" to="/chat">
              Chat
            </NavLink>
          </>
        )}
        {!loggedIn && (
          <>
            <NavLink className="text-white font-medium text-lg" to="/">
              Log In
            </NavLink>
            <NavLink className="text-white font-medium text-lg" to="/register">
              Register
            </NavLink>
          </>
        )}
        {loggedIn && (
          <button onClick={logout} className="text-white font-medium text-lg">
            Log Out
          </button>
        )}
      </section>
    </nav>
  );
};
