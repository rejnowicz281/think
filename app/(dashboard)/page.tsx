import getDateBullets from "@/actions/journal/read/get-date-bullets";
import ErrorContainer from "@/components/general/error-container";
import InteractiveEntryContainer from "@/components/journal/interactive-entry-container";
import { format } from "date-fns";

export default async function WritePage() {
    const date = format(new Date(), "yyyy-MM-dd");

    const { bullets } = await getDateBullets(date);

    if (!bullets) return <ErrorContainer />;

    return (
        <div className="flex flex-col flex-1 max-w-[700px] w-full mx-auto px-8 py-16">
            <InteractiveEntryContainer bullets={bullets} date={date} />
        </div>
    );
}
