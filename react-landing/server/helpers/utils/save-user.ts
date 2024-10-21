"use server";

import { cookies } from "next/headers";

import fetch from "./fetch-data/fetch-data";

const saveUser = async () => {
  const id = cookies().get("userId")?.value;

  if (!id) throw new Error("No session created");

  try {
    const users = await fetch("users");
    const user = users.find((user) => +user.id === +id);

    if (user) return;

    const newUser = { id, cart: [], favorites: [] };

    await fetch(`users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(newUser),
    });
  } catch (error) {
    throw error;
  }
};

export default saveUser;
