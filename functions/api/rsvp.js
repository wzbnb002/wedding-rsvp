export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // 1. Normalize the Chinese Name from the query string or body
  // Removes all types of spaces (standard and Chinese full-width)
  const rawName = url.searchParams.get("name") || "";
  const cleanName = rawName.replace(/[\s\u3000]+/g, '');

  if (!cleanName) return new Response("Name required", { status: 400 });

  // 2. HANDLE GET: Check for existing RSVP
  if (request.method === "GET") {
    const data = await env.WEDDING_RSVP.get(cleanName);
    return new Response(data || JSON.stringify({ new: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. HANDLE POST: Save/Update RSVP
  if (request.method === "POST") {
    const body = await request.json();
    // Save the data using the clean name as the key
    await env.WEDDING_RSVP.put(cleanName, JSON.stringify(body));
    return new Response("Success", { status: 200 });
  }
}