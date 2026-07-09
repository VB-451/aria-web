import type {MessageNodeType} from "./MessageNodeType.ts";

export interface ConversationType {
    nodes: Record<string, MessageNodeType>;
    rootId: string;
    currentNodeId: string
}