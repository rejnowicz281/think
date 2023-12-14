import { getEntry } from "@/actions/entries";
import Bullets from "./components/Bullets";
import Form from "./components/Form";
import Thoughts from "./components/Thoughts";

export default async function EntryPage({ params: { id } }) {
    const entry = await getEntry(id);

    return (
        <div>
            <h1>{entry.date}</h1>
            <i>{entry.id}</i>
            <Form id={id} />
            <Bullets bullets={entry.bullets} />
            <Thoughts thoughts={entry.thoughts} />
        </div>
    );
}
