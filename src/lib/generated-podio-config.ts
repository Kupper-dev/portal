export interface PodioAppConfig {
  appId: number;
  token: string;
  name: string;
  urlLabel: string;
}

export const PODIO_APPS: PodioAppConfig[] = [
  {
    appId: 30429788,
    token: process.env.PODIO_TOKEN_CUSTOMERS || "",
    name: "customers",
    urlLabel: "customers"
  },
  {
    appId: 30429789,
    token: process.env.PODIO_TOKEN_DEVICES || "",
    name: "devices",
    urlLabel: "devices"
  },
  {
    appId: 30429812,
    token: process.env.PODIO_TOKEN_SERVICES || "",
    name: "services",
    urlLabel: "services"
  },
  {
    appId: 30429856,
    token: process.env.PODIO_TOKEN_SERVICE_OR_SPARE_PART || "",
    name: "service_or_spare_part",
    urlLabel: "serviceorsparepart"
  },
  {
    appId: 30429881,
    token: process.env.PODIO_TOKEN_STORE || "",
    name: "store",
    urlLabel: "store"
  },
  {
    appId: 30429901,
    token: process.env.PODIO_TOKEN_GAMER || "",
    name: "gamer",
    urlLabel: "gamer"
  },
  {
    appId: 30429926,
    token: process.env.PODIO_TOKEN_ACQUIRED_DEVICES || "",
    name: "acquired_devices",
    urlLabel: "acquireddevices"
  },
  {
    appId: 30429927,
    token: process.env.PODIO_TOKEN_QUOTATIONS || "",
    name: "quotations",
    urlLabel: "quotations"
  },
  {
    appId: 30429978,
    token: process.env.PODIO_TOKEN_PLANS || "",
    name: "plans",
    urlLabel: "plans"
  },
  {
    appId: 30458040,
    token: process.env.PODIO_TOKEN_INVOICES || "",
    name: "invoices",
    urlLabel: "invoices"
  },
  {
    appId: 30432187,
    token: process.env.PODIO_TOKEN_APPOINTMENTS || "",
    name: "appointments",
    urlLabel: "appointments"
  },
  {
    appId: 30452168,
    token: process.env.PODIO_TOKEN_TICKETS || "",
    name: "tickets",
    urlLabel: "tickets"
  },
  {
    appId: 30432041,
    token: process.env.PODIO_TOKEN_STUDENTS || process.env.PODIO_APP_TOKEN_STUDENTS || "",
    name: "students",
    urlLabel: "students"
  },
  {
    appId: 30432042,
    token: process.env.PODIO_TOKEN_COURSES || "",
    name: "courses",
    urlLabel: "courses"
  },
  {
    appId: 30432049,
    token: process.env.PODIO_TOKEN_CLASSES || "",
    name: "classes",
    urlLabel: "classes"
  },
  {
    appId: 30432051,
    token: process.env.PODIO_TOKEN_ENROLLMENTS || "",
    name: "enrollments",
    urlLabel: "enrollments"
  },
  {
    appId: 30451972,
    token: process.env.PODIO_TOKEN_CHAPTERS || "",
    name: "chapters",
    urlLabel: "chapters"
  },
  {
    appId: 30588065,
    token: process.env.PODIO_TOKEN_TECHNICIANS || "",
    name: "technicians",
    urlLabel: "technicians"
  },
];

export function getAppConfig(appId: number): PodioAppConfig | undefined {
  return PODIO_APPS.find(a => a.appId === appId);
}
