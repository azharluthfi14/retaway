import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  // Check user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: `Unauthorized` });
  }

  // Retrieve authenticated user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { listedHomes: true },
  });

  // Check for authenticated user to get owner home

  const { id } = req.query;
  if (!user?.listedHomes?.find((home) => home.id === id)) {
    return res.status(401).send({ message: `Unauthorized` });
  }

  // Update home
  if (req.method === "PATCH") {
    // Update home data
    try {
      const home = await prisma.home.update({
        where: { id },
        data: req.body,
      });
      res.status(200).send(home);
    } catch (error) {}
  } else if (req.method === "DELETE") {
    try {
      const home = await prisma.home.delete({
        where: { id },
      });
      // Remove image from Supabase storage
      if (home.image) {
        const path = home.image.split(`${process.env.SUPABASE_BUCKET}/`)?.[1];
        await supabase.storage.from(process.env.SUPABASE_BUCKET).remove([path]);
      }
      res.status(200).send(home);
    } catch (e) {
      res.status(500).send({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res
      .status(405)
      .send({ message: `HTTP method ${req.method} is not supported.` });
  }
}
