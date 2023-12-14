import { getEntries } from "@/actions/entries";
import Entries from "./components/Entries";
import Form from "./components/Form";

export default async function EntriesPage() {
    const entries = await getEntries();

    return (
        <>
            <Form />
            <Entries entries={entries} />
        </>
    );
}
