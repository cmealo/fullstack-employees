import db from ".db/client";
import { createEmployee } from "./queries/employees.js";

async function seedEmployees() {
  // Optional: clear the table first to avoid duplicates
  await db.query("DELETE FROM employees;");

  const employees = [
    { name: "Alice", birthday: "1985-03-21", salary: 75000 },
    { name: "Bob", birthday: "1990-07-12", salary: 82000 },
    { name: "Charlie", birthday: "1988-11-03", salary: 91000 },
    { name: "Diana", birthday: "1992-05-27", salary: 64000 },
    { name: "Ethan", birthday: "1995-09-14", salary: 88000 },
    { name: "Fiona", birthday: "1987-12-08", salary: 97000 },
    { name: "George", birthday: "1983-02-18", salary: 72000 },
    { name: "Hannah", birthday: "1991-10-02", salary: 56000 },
    { name: "Ian", birthday: "1989-06-09", salary: 69000 },
    { name: "Jasmine", birthday: "1994-08-20", salary: 85000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }

  console.log("✅ Seeded 10 employees successfully!");
}

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");
