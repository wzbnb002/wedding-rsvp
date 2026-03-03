export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const rawName = url.searchParams.get("name") || "";
  const cleanName = rawName.replace(/[\s\u3000]+/g, '');

  if (!cleanName) return new Response(JSON.stringify({ error: "Name required" }), { status: 400 });

  if (request.method === "GET") {
    const data = await env.WEDDING_RSVP.get(cleanName);
    return new Response(data || JSON.stringify({ isNew: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    const body = await request.json();
    await env.WEDDING_RSVP.put(cleanName, JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
}