import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

export default function BulletIndicator({ loading }: { loading: boolean }) {
    if (loading) return <VscLoading className="animate-spin w-2 h-2 mt-2" />;
    else return <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>;
}
