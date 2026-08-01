import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema, habitSchema } from "../utils/validators";

describe("Zod Validation Schemas", () => {
  it("validates correct login credentials", () => {
    const result = loginSchema.safeParse({
      email: "user@suppermind.com",
      password: "securepassword123",
    });
    expect(result.success).toBe(true);
  });

  it("fails login with invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("fails registration when passwords do not match", () => {
    const result = registerSchema.safeParse({
      fullName: "Alex Vance",
      email: "alex@example.com",
      password: "password123",
      confirmPassword: "differentpassword",
    });
    expect(result.success).toBe(false);
  });

  it("validates habit creation schema", () => {
    const result = habitSchema.safeParse({ name: "Morning Meditation" });
    expect(result.success).toBe(true);
  });
});
