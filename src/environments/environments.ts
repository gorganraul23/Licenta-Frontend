export const environments = {
  production: false,
  apiUrl: "http://192.168.1.2:8000/",
  websocketUrl: "ws://192.168.1.2:8000/ws/realtime/",
  apiEndpoints: {
    login: "users/login-web/",
    register: "users/register/",
    users: "users/",
    session: "api/session",
    sessionRunning: "api/session/running",
    sensorData: "api/sensor-data/session/",
    saveExperiment: "experiments/save",
    saveExperimentTime: "experiments/save-time",
  },
};
