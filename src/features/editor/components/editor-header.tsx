"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { EditorBreadcrumbs } from "./editor-bread-crumbs";
import { EditorSaveButton } from "./editor-save-button";

export const EditorHeader = ({ workflowId }: { workflowId: string }) => {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-2
        border-b px-4 bg-background"
    >
      <SidebarTrigger />
      <div className="flex flex-row items-center justify-center gap-x-4 w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};
