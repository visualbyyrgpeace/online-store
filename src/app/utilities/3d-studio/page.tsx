import type { Metadata } from "next";
import { Studio3DUtility } from "@/components/studio-3d-utility";
import { ToolShell } from "@/components/utilities/tool-shell";

export const metadata: Metadata = { title: "3D Studio" };

export default function Studio3DPage() {
  return (
    <ToolShell title="3D Studio" width="max-w-7xl">
      <Studio3DUtility />
    </ToolShell>
  );
}
