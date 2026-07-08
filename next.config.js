import { Redis } from "@upstash/redis";

const kv = Redis.fromEnv();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) {
    return Response.json({ error: "missing key" }, { status: 400 });
  }
  try {
    const value = await kv.get(key);
    if (value === null || value === undefined) {
      return Response.json({ error: "not found" }, { status: 404 });
    }
    return Response.json({ key, value });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return Response.json({ error: "invalid json body" }, { status: 400 });
  }
  const { key, value } = body || {};
  if (!key) {
    return Response.json({ error: "missing key" }, { status: 400 });
  }
  try {
    await kv.set(key, value);
    return Response.json({ key, value });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
