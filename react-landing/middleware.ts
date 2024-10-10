import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const user = req.cookies.get("userId");
  const res = NextResponse.next();

  if (!user) {
    const id = (Date.now() - Math.random()).toString();
    res.cookies.set("userId", id, {
      path: "/",
    });
  }

  return res;
};
