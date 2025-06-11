import prisma from "../../../lib/prisma";
import { getSession } from "../../actions/getCurrentUser";



const mealGet = async () => {
    const session = await getSession();

    if (session && session.user !== null) {
        const meals = await prisma.health.findMany({
            where: { author: session.user },
        });
        return meals;
    } else {
        const meals = [{}];
        return meals;
    }
}


export default mealGet