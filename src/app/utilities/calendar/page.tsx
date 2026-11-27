import type { Metadata } from "next";
import { CalendarUtility } from "@/components/calendar-utility";
import { ToolShell } from "@/components/utilities/tool-shell";

export const metadata: Metadata = { title: "Lịch" };

export default function CalendarPage() {
  return (
    <ToolShell title="Lịch" width="max-w-5xl">
      <CalendarUtility />
    </ToolShell>
  );
}
