export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  const isAdmin = url.searchParams.get("admin") === "true";

  // ADMIN VIEW: Return all guests
  if (isAdmin && request.method === "GET") {
    const list = await env.WEDDING_RSVP.list();
    const results = await Promise.all(
      list.keys.map(key => env.WEDDING_RSVP.get(key.name, { type: "json" }))
    );
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  }

  const cleanName = name.replace(/[\s\u3000]+/g, '');

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