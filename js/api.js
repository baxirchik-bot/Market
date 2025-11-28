const API_BASE = "https://baxir.pythonanywhere.com";

async function fetchAds() {
    const res = await fetch(`${API_BASE}/ads`);
    if (!res.ok) {
        console.error("Ошибка при запросе /ads", res.status);
        return [];
    }
    return await res.json();
}
