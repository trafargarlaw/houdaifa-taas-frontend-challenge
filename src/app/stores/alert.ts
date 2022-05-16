import { defineStore } from "pinia";
//done

interface AlertState {
  alerts: Array<{
    type: string;
    message: string;
    id: number;
  }>;
}

export const useAlert = defineStore("alert", {
  state: (): AlertState => ({
    alerts: [],
  }),
  actions: {
    triggerAlert(type: "success" | "error", message: string) {
      let id = Math.floor(Math.random() * 10000000);
      // add a new alert to the alerts array and delete it after 3 seconds which will result into the alert being shown for 3 sec and removed
      this.alerts = [...this.alerts, { type, message, id }];
      setTimeout(() => {
        this.removeAlert(id);
      }, 3000);
      return;
    },
    removeAlert(id: number) {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
  },
});
