import type {MessageNode} from "./MessageNode.ts";

export interface Conversation {
    nodes: Record<string, MessageNode>;
    rootId: string;
    currentNodeId: string
}