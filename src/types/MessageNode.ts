export interface MessageNode {
    id: string;
    parentId: string;
    childrenIds: string[];
    role: string;
    content: string;
    function_type: string | null;
}