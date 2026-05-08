import type {Conversation} from "../types/Conversation.ts";
import type {MessageNode} from "../types/MessageNode.ts";

const addChildId = (node: MessageNode, childId: string) => ({
    ...node,
    childrenIds: [...node.childrenIds, childId]
});

const appendNode = (
    conversation: Conversation,
    parentId: string,
    {
        id,
        role,
        content,
        function_type = null
    }: {
        id: string;
        role: string;
        content: string;
        function_type?: string | null;
    }
) => {
    const newNode = {
        id,
        parentId,
        childrenIds: [],
        role,
        content,
        function_type
    };

    const parent = conversation.nodes[parentId];


    return {
        ...conversation,
        nodes: {
            ...conversation.nodes,

            [id]: newNode,

            [parentId]: parent
                ? addChildId(parent, id)
                : parent
        },
        currentNodeId: id
    };
};

export const appendUserMessage = (
    conversation: Conversation,
    content: string,
    id: string
) => {
    const current = conversation.nodes[conversation.currentNodeId];

    if (current.role !== "assistant" && current.role !== "system") {
        throw new Error("User message must follow assistant");
    }

    return appendNode(conversation, current.id, {
        id,
        role: "user",
        content
    });
};

export const appendAssistantMessage = (
    conversation: Conversation,
    content: string,
    id: string,
    function_type: string | null
) => {
    const current = conversation.nodes[conversation.currentNodeId];

    if (current.role !== "user") {
        throw new Error("Assistant must follow user");
    }

    return appendNode(conversation, current.id, {
        id,
        role: "assistant",
        content,
        function_type
    });
};

export const addSibling = (conversation: Conversation, assistantNodeId: string, newContent: string, id:string, function_type: string | null, ifAnswer: boolean) => {
    const assistantNode = conversation.nodes[assistantNodeId]

    if (!assistantNode) {
        throw new Error('Node not found')
    }

    const parentId = assistantNode.parentId

    if (!parentId) {
        throw new Error('Cannot regenerate root')
    }


    return appendNode(conversation, parentId, {
        role: ifAnswer ? 'assistant' : 'user',
        content: newContent,
        id,
        function_type
    })
}

export const deleteSubtree = (conversation: Conversation, nodeId: string) => {
    const newConversation = {
        ...conversation,
        nodes: { ...conversation.nodes }
    };

    const toDelete = new Set<string>();

    const collect = (id: string) => {
        const node = newConversation.nodes[id];
        if (!node) return;

        toDelete.add(id);
        node.childrenIds.forEach(collect);
    };

    collect(nodeId);

    for (const id of toDelete) {
        const node = newConversation.nodes[id];
        if (node?.parentId && !toDelete.has(node.parentId)) {
            const parent = newConversation.nodes[node.parentId];
            if (parent) {
                parent.childrenIds = parent.childrenIds.filter(cid => cid !== id);
            }
        }
    }

    for (const id of toDelete) {
        delete newConversation.nodes[id];
    }

    if (toDelete.has(newConversation.currentNodeId)) {
        const fallback = conversation.nodes[nodeId]?.parentId || conversation.rootId;
        newConversation.currentNodeId = fallback;
    }

    return newConversation;
};

export const getPath = (conversation: Conversation, nodeId: string) => {
    const path = []
    let current: MessageNode | null = conversation.nodes[nodeId]

    while (current) {
        path.push(current)
        current = current.parentId
            ? conversation.nodes[current.parentId]
            : null
    }

    return path.reverse()
}

export const switchBranch = (conversation: Conversation, nodeId: string) => {
    if (!conversation.nodes[nodeId]) {
        throw new Error('Node not found')
    }

    let bufferNodeID = nodeId;

    while (true){
        const childrenIDS = conversation.nodes[bufferNodeID].childrenIds
        if (childrenIDS.length > 0){
            bufferNodeID = childrenIDS[0]
        } else {
            break;
        }
    }

    return {
        ...conversation,
        currentNodeId: bufferNodeID
    };
}

