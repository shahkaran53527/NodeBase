"use client";

import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows";
import { useEffect, useRef, useState } from "react";

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow?.name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (workflow?.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(workflow?.name);
    }
  }, [workflow?.name]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleNameSave = async () => {
    if (name === workflow?.name) {
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkflowName.mutateAsync({
        id: workflowId,
        name: name ?? "",
      });
    } catch {
      setName(workflow?.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setName(workflow?.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={name}
        disabled={updateWorkflowName.isPending}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleNameSave}
        onKeyDown={handleKeyDown}
        className="h-7 w-auto min-w-[100px] px-2"
      />
    );
  }

  return (
    <BreadcrumbItem
      className="cursor-pointer hover:text-foreground transition-colors"
      onClick={() => setIsEditing(true)}
    >
      {workflow?.name}
    </BreadcrumbItem>
  );
};
