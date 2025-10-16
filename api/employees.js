import { Router } from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees.js";

const router = Router();

// digits-only; rejects "1e10", allows "0" (so you can return 404 later)
const parseId = (s) => (/^\d+$/.test(s) ? Number(s) : NaN);

// GET /employees
router.get("/", async (_req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};
    if (!name || !birthday || salary == null) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, birthday, salary" });
    }
    const created = await createEmployee({ name, birthday, salary });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const { name, birthday, salary } = req.body || {};
    if (!name || !birthday || salary == null) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, birthday, salary" });
    }
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id   <-- fixed braces here
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "id must be a positive integer" });
    }
    const deleted = await deleteEmployee(id);
    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
