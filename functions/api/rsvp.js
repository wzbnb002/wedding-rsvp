export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Normalize: Remove all Chinese and standard spaces
  const rawName = url.searchParams.get("name") || "";
  const cleanName = rawName.replace(/[\s\u3000]+/g, '');

  if (!cleanName && request.method === "GET") {
    return new Response(JSON.stringify({ error: "Missing name" }), { status: 400 });
  }

  // Handle GET: Search for guest
  if (request.method === "GET") {
    const data = await env.WEDDING_RSVP.get(cleanName);
    if (!data) {
      return new Response(JSON.stringify({ isNew: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Handle POST: Save/Update guest
  if (request.method === "POST") {
    const body = await request.json();
    await env.WEDDING_RSVP.put(cleanName, JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}