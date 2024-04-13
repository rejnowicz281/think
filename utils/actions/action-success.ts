import { ActionResponseConfig } from "@/types/action-response-config";
import actionResponse from "./action-response";

export default function actionSuccess(
    actionName: string,
    data: Record<string, any> = {},
    config: ActionResponseConfig = {}
) {
    return actionResponse(true, actionName, data, config);
}
