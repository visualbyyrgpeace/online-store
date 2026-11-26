import type { Metadata } from "next";
import { VietFontUtility } from "@/components/viet-font-utility";
import { ToolShell } from "@/components/utilities/tool-shell";

export const metadata: Metadata = { title: "Việt hóa font" };

export default function VietFontPage() {
  return (
    <ToolShell title="Việt hóa font" width="max-w-5xl">
      <VietFontUtility />
    </ToolShell>
  );
}
