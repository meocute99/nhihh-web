export async function storageGet(key) {
  const res = await fetch(`/api/data?key=${encodeURIComponent(key)}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`storage get failed for "${key}"`);
  }
  const data = await res.json();
  return data.value;
}

export async function storageSet(key, value) {
  const res = await fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) {
    throw new Error(`storage set failed for "${key}"`);
  }
  return true;
}
