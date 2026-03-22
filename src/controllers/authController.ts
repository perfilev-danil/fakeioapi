import type { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/authService.ts";
import { generateToken } from "../utils/generateToken.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, avatar } = req.body;

    const user = await registerUser({ name, email, password, avatar });

    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: { token },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = generateToken(user.id, res);

    res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  logoutUser();

  // Clear JWT cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
