import { redirect } from "next/navigation";
import { getSession } from "./actions/getCurrentUser";

const Landing = async () => {


  const session = await getSession();

  if (session) {
    redirect("/home")
  } else {
    redirect("/login")
  }
}

export default Landing;
