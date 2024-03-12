export const environment = {
  production: false,
  appConfig: "dev",
  pathConfig: "./assets/config",
  apiSuffix: "/api/v1/",
  negotiation: "/negotiation/negotiations",
  companyAppUrl:
    "https://az-qrcustomlink-back-company-appservice-dev.azurewebsites.net",
  identityAppUrl:
    " https://localhost:5101",

  ordersAppsUrl:
    "https://az-qrcustomlink-back-order-appservice-dev.azurewebsites.net",
  frontAdminUrl: "https://red-pond-0f1373910.4.azurestaticapps.net",
  frontCustomerUrl: "https://icy-forest-02940fb10.4.azurestaticapps.net",
};

export const resources = {
  company: "companies",
  commercialSegments: "commercial-segments",
  documentTypes: "document-types",
  auth: "auth",
  user: "users",
  orders: "orders",
};
