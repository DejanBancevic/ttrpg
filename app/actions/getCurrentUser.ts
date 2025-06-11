import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOp";


export async function getSession() {
    return await getServerSession(authOptions);
}