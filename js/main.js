// js/main.js

// Преобразуем дату в красивый формат (если есть created_at)
function formatDate(iso) {
    if (!iso) return "";
    // Берём только YYYY-MM-DD
    return iso.split("T")[0].split(" ")[0];
}

async function renderAdsOnHome() {
    const container = document.getElementById("ads-list");
    if (!container) return; // если блока нет — ничего не делаем

    container.innerHTML = "Yuklanmoqda..."; // "Загружаем..."

    try {
        const ads = await fetchAds();

        if (!ads || ads.length === 0) {
            container.innerHTML = "Hozircha e'lonlar yo'q.";
            return;
        }

        // Собираем HTML-карточки
        const cardsHtml = ads.map(ad => {
            const title = ad.title || "E'lon";
            const city = ad.city || "Shahar ko'rsatilmagan";
            const price = ad.price ? `${ad.price} ${ad.currency || ""}` : "Narx kelishilgan holda";
            const created = formatDate(ad.created_at);

            return `
                <div class="ad-card">
                    <div class="ad-card-main">
                        <div class="ad-card-title">${title}</div>
                        <div class="ad-card-price">${price}</div>
                    </div>
                    <div class="ad-card-meta">
                        <span>📍 ${city}</span>
                        ${created ? `<span>📅 ${created}</span>` : ""}
                    </div>
                </div>
            `;
        }).join("");

        container.innerHTML = cardsHtml;

    } catch (err) {
        console.error(err);
        container.innerHTML = "Xatolik yuz berdi. Keyinroq urinib ko'ring.";
    }
}

// Запускаем после загрузки страницы
document.addEventListener("DOMContentLoaded", renderAdsOnHome);
