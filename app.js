import express from "express";
import employeesRouter from "#api/employees.js";

const app = express();

// Body parsing
app.use(express.json());

// Root welcome route
app.get("/", (_req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Mount routers
app.use("/employees", employeesRouter);

// 404 fallthrough
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  // validation
  res.status(500).json({ error: err.message ?? "Internal Server Error" });
});

export default app;
