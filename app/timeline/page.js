import { getEntries } from "@/actions/entries";
import Timeline from "./components/Timeline";

export default async function TimelinePage() {
    const entries = await getEntries();

    return <Timeline entries={entries} />;
}
