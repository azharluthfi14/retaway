import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Limit size image upload
    },
  },
};

export default async function handler(req, res) {
  // Upload image to supabase
  if (req.method === "POST") {
    let { image } = req.body;
    if (!image) {
      return res.status(500).send({ message: "No image provided" });
    }

    try {
      // Check image to encoded base64
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).send({ message: "Image data not valid" });
      }

      // Setting image file upload
      const fileName = nanoid(); // Generate random string for name image
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error("Unable to upload image to storage");
      }

      // Construct public URL foc getting image
      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (error) {
      res.status(500).send({ message: "Something went error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .send({ message: `HTTP method ${req.method} is not supported.` });
  }
}
