import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useFormStatus } from "react-dom";

export default function BulletIndicator() {
    const { pending } = useFormStatus();

    if (pending) return <VscLoading className="animate-spin w-2 h-2 mt-2" />;
    else return <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>;
}
