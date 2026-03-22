import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWT tokens
import pkg from "express"; // Import Express (we only need the types)
import type { Response } from "express"; // Import the type for Express response

/**
 * Generates a JWT token for a user and sets it as a cookie in the response
 * @param userId - The ID of the user to include in the token payload
 * @param res - Express Response object to set the cookie
 * @returns The generated JWT token as a string
 */
export const generateToken = (userId: string, res: Response) => {
  // Create the payload of the token. In this case, we only include the user ID
  const payload = { id: userId };

  // Ensure that the JWT secret key is defined in environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Sign the JWT token using the secret key
  // Set the token to expire in 7 days
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token as an HTTP-only cookie in the response
  // httpOnly: true prevents client-side JavaScript from accessing the cookie
  // secure: true ensures the cookie is only sent over HTTPS (production only)
  // sameSite: 'strict' prevents CSRF attacks
  // maxAge: the cookie will expire in 7 days
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
  });

  // Return the token so it can also be sent in the response body if needed
  return token;
};
