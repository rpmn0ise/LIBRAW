export default function () {
  return {
    environment: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    buildTime: new Date().toISOString(),
    buildDate: new Date().toLocaleDateString("fr-FR", {
      month: "2-digit",
      year: "numeric",
    }),
  };
}
