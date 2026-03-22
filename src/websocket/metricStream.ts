import { Server } from "socket.io";
import { createMetrics } from "../services/metricService.ts";

export const startMetricStream = (io: Server) => {
  console.log("Metric stream started");

  setInterval(async () => {
    const metrics = await createMetrics();

    if (!metrics || metrics.length === 0) {
      return;
    }

    for (const data of metrics) {
      io.emit("metric:update", data);
    }
  }, 30000);
};
