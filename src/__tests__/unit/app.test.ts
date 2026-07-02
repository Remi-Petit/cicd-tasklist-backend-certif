import { describe, it, expect, vi } from "vitest";

// Mock prisma so importing the app (routes -> controller -> service -> prisma)
// does not instantiate a real database client.
vi.mock("../../lib/prisma.js", () => ({
	default: {
		task: {
			findMany: vi.fn(),
			findUnique: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		},
	},
}));

import app from "../../app.js";
import taskRoutes from "../../routes/task.routes.js";

describe("app", () => {
	it("should export an Express application", () => {
		expect(app).toBeDefined();
		// An Express app is a callable function.
		expect(typeof app).toBe("function");
	});

	it("should expose the request handling method", () => {
		expect(typeof app.use).toBe("function");
		expect(typeof app.listen).toBe("function");
	});
});

describe("task routes", () => {
	it("should export an Express router", () => {
		expect(taskRoutes).toBeDefined();
		expect(typeof taskRoutes).toBe("function");
	});

	it("should register the CRUD routes", () => {
		const paths = taskRoutes.stack
			.filter((layer: any) => layer.route)
			.map((layer: any) => ({
				path: layer.route.path,
				methods: Object.keys(layer.route.methods),
			}));

		expect(paths).toEqual(
			expect.arrayContaining([
				{ path: "/", methods: expect.arrayContaining(["get"]) },
				{ path: "/", methods: expect.arrayContaining(["post"]) },
				{ path: "/:id", methods: expect.arrayContaining(["get"]) },
				{ path: "/:id", methods: expect.arrayContaining(["put"]) },
				{ path: "/:id", methods: expect.arrayContaining(["delete"]) },
			])
		);
	});
});
