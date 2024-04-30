import { DragControls } from "framer-motion";
import BulletIndicator from "./bullet-indicator";
import BulletText from "./bullet-text";

export default function BulletContainer({
    pos,
    date,
    text,
    loading = false,
    controls,
    onTextClick,
}: {
    pos?: number;
    date?: string;
    text: string;
    loading?: boolean;
    controls?: DragControls;
    onTextClick?: () => void;
}) {
    return (
        <div data-date={date} data-pos={pos} className="bullet-container flex gap-2 group">
            <BulletIndicator loading={loading} controls={controls} />
            <BulletText text={text} onClick={onTextClick} />
        </div>
    );
}
