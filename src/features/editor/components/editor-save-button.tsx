import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useUpdateWorkflow } from "@/features/workflows/hooks/use-workflows";
import { SaveIcon } from "lucide-react";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const {
    state: { editor },
  } = useAppContext();

  const saveWorkflow = useUpdateWorkflow();

  const handleSave = async () => {
    if (!editor) {
      return;
    }

    const nodes = editor.getNodes();
    const edges = editor.getEdges();

    saveWorkflow.mutate({
      id: workflowId,
      nodes,
      edges,
    });
  };

  return (
    <div className="ml-auto">
      <Button size="sm" onClick={handleSave} disabled={saveWorkflow.isPending}>
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};
