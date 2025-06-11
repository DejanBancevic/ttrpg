import { redirect } from "next/navigation";
import Home from "./home/page";
import { getSession } from "./actions/getCurrentUser";
import Login from "./login/page";

const Landing = async () => {


  const session = await getSession();

  if (session) {
    return (
      <Home />
    )
  }

  return (
    <Login />
  );
}

export default Landing;
