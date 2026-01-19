import SummaryOpening from "./SummaryOpening.vue";
import CpuSummary from "./CpuSummary.vue";
import GpuSummary from "./GpuSummary.vue";
import ApuSummary from "./ApuSummary.vue";
import EmulatorShowcase from "./EmulatorShowcase.vue";

export const summaryRoutes = [
  { slide: SummaryOpening, notes: [] },
  { slide: CpuSummary, notes: [] },
  { slide: GpuSummary, notes: [] },
  { slide: ApuSummary, notes: [] },
  { slide: EmulatorShowcase, notes: [] },
];
