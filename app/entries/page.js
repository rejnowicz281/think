import { getEntries } from "@/actions/entries";
import Link from "next/link";
import Entries from "./components/Entries";
import Form from "./components/Form";

export default async function EntriesPage() {
    const entries = await getEntries();

    return (
        <>
            <Link href="/thoughts">Go to Thoughts</Link>
            <Form />
            <Entries entries={entries} />
        </>
    );
}
