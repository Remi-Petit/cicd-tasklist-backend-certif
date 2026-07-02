import { describe, it, expect, afterAll } from "vitest";

// No mock here: we import the real prisma singleton to cover its module code.
// The PrismaClient constructor does not open a connection until a query runs,
// so simply importing and inspecting it is safe and requires no database.
import prisma from "../../lib/prisma.js";

describe("prisma singleton", () => {
	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("should export an instantiated Prisma client", () => {
		expect(prisma).toBeDefined();
		expect(typeof prisma.$connect).toBe("function");
		expect(typeof prisma.$disconnect).toBe("function");
	});

	it("should expose the task model delegate", () => {
		expect(prisma.task).toBeDefined();
		expect(typeof prisma.task.findMany).toBe("function");
	});
});
