export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const googleAppsScriptURL = process.env.SUMMERCAMP_GOOGLE_APPS_SCRIPT_URL;
    if (!googleAppsScriptURL) {
      throw new Error("Missing environment variable: SUMMERCAMP_GOOGLE_APPS_SCRIPT_URL");
    }

    const file = formData.get("paymentScreenshot") as File | null;
    let screenshotBase64 = "";
    let fileName = "";
    let fileType = "";

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      screenshotBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      fileName = file.name;
      fileType = file.type;
    }

    // Convert groupMembers and courses back from JSON string
    const groupMembers = JSON.parse(formData.get("groupMembers") as string);
    const courses = JSON.parse(formData.get("courses") as string);

    const payload = {
      name: formData.get("name"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      cnic: formData.get("cnic"),
      phone: formData.get("phone"),
      whatsapp: formData.get("whatsapp"),
      emergencyContact: formData.get("emergencyContact"),
      email: formData.get("email"),
      applyingAs: formData.get("applyingAs"),
      groupMembers,
      institution: formData.get("institution"),
      grade: formData.get("grade"),
      courses,
      experience: formData.get("experience"),
      screenshotBase64,
      fileName,
      fileType,
    };

    const response = await fetch(googleAppsScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    return new Response(JSON.stringify({ message: "Success", detail: result }), {
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
