import { DragControls } from "framer-motion";
import BulletIndicator from "./bullet-indicator";
import BulletText from "./bullet-text";

export default function BulletContainer({
    text,
    loading = false,
    controls,
    onTextClick,
}: {
    text: string;
    loading?: boolean;
    controls?: DragControls;
    onTextClick?: () => void;
}) {
    return (
        <div className="flex gap-2 group">
            <BulletIndicator loading={loading} controls={controls} />
            <BulletText text={text} onClick={onTextClick} />
        </div>
    );
}
