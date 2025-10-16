import app from "#app.js";
import db from "#db/client.js";

const PORT = process.env.PORT ?? 3000;

async function start() {
  await db.connect(); // pg.Client — connect once for the process
  app.listen(PORT, () => {
    console.log(`🚀 Listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
