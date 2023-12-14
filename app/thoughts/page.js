import { getThoughts } from "@/actions/thoughts";
import Form from "./components/Form";
import Thoughts from "./components/Thoughts";

export default async function ThoughtsPage() {
    const thoughts = await getThoughts();

    return (
        <>
            <Form />
            <Thoughts thoughts={thoughts} />
        </>
    );
}
