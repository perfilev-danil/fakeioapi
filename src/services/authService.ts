import bcrypt from "bcryptjs";
import { prisma } from "../config/db.ts";
import type { RegisterBody } from "../types/req";

/**
 * Register a new user
 * Handles business logic for creating a user
 */
export const registerUser = async ({
  name,
  email,
  password,
  avatar,
}: RegisterBody) => {
  // Check if a user with this email already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("User already exists with this email");
  }

  // Generate salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      avatar,
      password: hashedPassword,
    },
  });

  return user;
};

/**
 * Validate user credentials during login
 */
export const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};

/**
 * Logout user
 * In JWT auth this usually means clearing the cookie
 */
export const logoutUser = () => {
  // Nothing to do in database because JWT is stateless
  return true;
};
