import { Node, Connection } from "@/generated/prisma/browser";
import toposort from "toposort";
import { inngest } from "./client";
import { createId } from "@paralleldrive/cuid2";

export const topologicalSort = (
  nodes: Node[],
  connections: Connection[]
): Node[] => {
  if (connections.length === 0) {
    return nodes;
  }

  const edges: [string, string][] = connections.map((connection) => [
    connection.fromNodeId,
    connection.toNodeId,
  ]);

  const connectedNodeIds = new Set<string>(
    connections.flatMap((connection) => [
      connection.fromNodeId,
      connection.toNodeId,
    ])
  );

  for (const node of nodes) {
    if (!connectedNodeIds.has(node.id)) {
      edges.push([node.id, node.id]);
    }
  }

  let sortedNodeIds: string[] = [];

  try {
    sortedNodeIds = toposort(edges);

    // Remove duplicates
    sortedNodeIds = [...new Set(sortedNodeIds)];
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cyclic")) {
      throw new Error("Workflow has cyclic dependencies");
    }
    throw error;
  }
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return sortedNodeIds
    .map((nodeId) => nodeMap.get(nodeId) as Node)
    .filter(Boolean);
};

export const sendWorkflowExecution = async (data: {
  workflowId: string;
  [key: string]: unknown;
}) => {
  inngest.send({
    name: "workflows/execute.workflow",
    data,
    id: createId(),
  });
};
