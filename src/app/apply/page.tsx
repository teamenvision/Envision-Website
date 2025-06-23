export default function ApplyPage() {
  const applyEnabled = process.env.NEXT_PUBLIC_APPLY_ENABLED === "true";
  if (!applyEnabled) {
    return <p className="text-center text-gray-500">Recruitment is currently closed.</p>;
  }
  return (
    <form className="space-y-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Apply to Team Envision</h1>
      <input type="text" placeholder="Full Name" className="w-full border p-2" />
      <input type="email" placeholder="Email" className="w-full border p-2" />
      <textarea placeholder="Why do you want to join?" className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
  );
}