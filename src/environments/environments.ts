export const environments = {
  production: false,
  apiUrl: "http://192.168.156.233:8000/",
  websocketUrl: "ws://192.168.156.233:8000/ws/realtime/",
  apiEndpoints: {
    login: "users/login-web/",
    register: "users/register/",
    users: "users/",
    session: "api/session",
    sensorData: "api/sensor-data/session/",
  },
};
