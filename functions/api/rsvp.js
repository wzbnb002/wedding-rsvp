export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // 1. Get and Clean the Chinese Name
  const rawName = url.searchParams.get("name") || "";
  const cleanName = rawName.replace(/[\s\u3000]+/g, '');

  if (!cleanName) {
    return new Response(JSON.stringify({ error: "Name required" }), { status: 400 });
  }

  // 2. Handle GET (Search for existing user)
  if (request.method === "GET") {
    try {
      const data = await env.WEDDING_RSVP.get(cleanName);
      if (!data) {
        // Return a 'new' flag if person isn't in DB yet
        return new Response(JSON.stringify({ isNew: true }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response(data, {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  // 3. Handle POST (Save/Update)
  if (request.method === "POST") {
    try {
      const body = await request.json();
      // We store the whole object as a string in KV
      await env.WEDDING_RSVP.put(cleanName, JSON.stringify(body));
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Failed to save" }), { status: 500 });
    }
  }
}