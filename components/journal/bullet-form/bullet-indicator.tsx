import { RxDragHandleDots2 } from "@react-icons/all-files/rx/RxDragHandleDots2";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { DragControls } from "framer-motion";
import { PointerEvent } from "react";

export default function BulletIndicator({ loading, controls }: { loading: boolean; controls?: DragControls }) {
    if (loading) return <VscLoading className="animate-spin w-2 h-2 mt-2" />;
    else if (controls) {
        return (
            <div
                onPointerDown={(e: PointerEvent<Element> | PointerEvent) => {
                    e.preventDefault();
                    controls.start(e);
                }}
                style={{ touchAction: "none" }}
                className="w-2 flex items-start justify-center relative cursor-move"
            >
                <div className="mt-1 flex-1 opacity-0 transition-opacity duration-300 absolute group-focus-within:flex group-focus-within:opacity-25 group-focus-within:static group-hover:static group-hover:flex group-hover:opacity-75">
                    <RxDragHandleDots2 className="flex-1 shrink-0 text-xl" />
                </div>
                <div className="mt-2 flex-1 h-2 transition-opacity duration-300 opacity-100 group-focus-within:opacity-0 group-focus-within:absolute group-hover:opacity-0 group-hover:absolute shrink-0 rounded-full bg-blue-500"></div>
            </div>
        );
    } else return <div className="shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2"></div>;
}
