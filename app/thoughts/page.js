import { getThoughts } from "@/actions/thoughts";
import Link from "next/link";
import Form from "./components/Form";
import Thoughts from "./components/Thoughts";

export default async function ThoughtsPage() {
    const thoughts = await getThoughts();

    return (
        <>
            <Link href="/entries">Go to Entries</Link>
            <Form />
            <Thoughts thoughts={thoughts} />
        </>
    );
}
