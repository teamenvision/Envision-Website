export async function POST(req: Request) {
  try {
    const body = await req.json();

    const googleAppsScriptURL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!googleAppsScriptURL) {
      throw new Error("Missing environment variable: GOOGLE_APPS_SCRIPT_URL");
    }

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
    console.error("Submission failed:", err);
    return new Response(JSON.stringify({ message: "Failed to submit", error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
