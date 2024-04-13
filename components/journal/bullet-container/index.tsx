import { Bullet } from "@/types/bullet";
import EditableBullet from "./editable-bullet";
import NormalBullet from "./normal-bullet";

export default function BulletContainer({ bullet, editable = false }: { bullet: Bullet; editable?: boolean }) {
    if (editable) return <EditableBullet bullet={bullet} />;
    else return <NormalBullet bullet={bullet} />;
}
