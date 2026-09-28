import { v2 as cloudinary } from "cloudinary";
import { applicationsOpen } from "@/lib/config";

const TYPES = new Set(["sponsor", "designer", "vendor"]);

/**
 * Signs a direct browser upload to Cloudinary. The browser sends the file straight to
 * Cloudinary, so large lookbooks never pass through (or hit the body limit of) this server.
 */
export async function POST(request: Request) {
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } =
    process.env;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({ error: "File uploads aren't set up yet. Email your files to us instead." }, { status: 503 });
  }
  if (!applicationsOpen()) {
    return Response.json({ error: "Applications are closed." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { type?: string } | null;
  const type = body?.type ?? "";
  if (!TYPES.has(type)) {
    return Response.json({ error: "Choose how you're applying before uploading files." }, { status: 400 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = `kiff-2027/applications/${type}`;
  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, apiSecret);

  return Response.json({ signature, timestamp, folder, apiKey, cloudName });
}
