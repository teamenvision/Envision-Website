export async function POST(req: Request) {
  try {
    const body = await req.json();

    const googleAppsScriptURL = "https://script.google.com/macros/s/AKfycbxMvJl6SlNShRDW4Z6KXa9dYGuVgv6ZusBaSHlks7EoRJ2YfpHU0jsjWf7CbdJbRUDX/exec";

    const response = await fetch(googleAppsScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    return new Response(JSON.stringify({ message: "Success", detail: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Submission failed:", err); // <-- SEE THE ERROR HERE
    return new Response(JSON.stringify({ message: "Failed to submit", error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
