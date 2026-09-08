"use server";

import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/lib/models/AdminUser";
import {
  endSession,
  hashPassword,
  startSession,
  verifyPassword,
} from "@/lib/auth";
import { fieldErrorsOf, loginSchema } from "@/lib/validation";

export type LoginState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * A hash of a random value nobody knows, compared against when the email is
 * unknown. Without it, a missing account returns far faster than a wrong
 * password, and the response time reveals which addresses are registered.
 * Computed once per process and reused.
 */
let decoyHash: Promise<string> | null = null;

function getDecoyHash(): Promise<string> {
  decoyHash ??= hashPassword(crypto.randomUUID());
  return decoyHash;
}

export async function signIn(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error) };
  }

  let destination = "/admin";

  try {
    await connectDb();

    const user = await AdminUser.findOne({
      email: parsed.data.email.toLowerCase(),
    });

    const passwordMatches = await verifyPassword(
      parsed.data.password,
      user?.passwordHash ?? (await getDecoyHash()),
    );

    // One message for every failure mode: unknown email, wrong password, and
    // deactivated account are indistinguishable to the caller.
    if (!user || !user.active || !passwordMatches) {
      return { error: "Email or password is incorrect." };
    }

    await AdminUser.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } },
    );

    await startSession({
      sub: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const next = formData.get("next");
    // Only same-site admin paths, so `next` cannot become an open redirect.
    if (typeof next === "string" && /^\/admin(?:[/?#]|$)/.test(next)) {
      destination = next;
    }
  } catch (error) {
    console.error("[login] failed", error);
    return {
      error:
        "Could not reach the database. Check the server configuration and try again.",
    };
  }

  redirect(destination);
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/login");
}
