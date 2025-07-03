import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

const Landing = async () => {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home")
  } else {
    redirect("/login")
  }
}

export default Landing;
