import type { Metadata } from "next";
import { VietFontGate } from "@/components/viet-font-gate";
import { VietFontUtility } from "@/components/viet-font-utility";
import { ToolShell } from "@/components/utilities/tool-shell";

export const metadata: Metadata = { title: "Việt hóa font" };

export default function VietFontPage() {
  return (
    <ToolShell title="Việt hóa font" width="max-w-5xl">
      <VietFontGate>
        <VietFontUtility />
      </VietFontGate>
    </ToolShell>
  );
}
