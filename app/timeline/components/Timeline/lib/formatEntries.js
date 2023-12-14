export default function formatEntries(entries) {
    const value = {};
    let totalWords = 0;

    entries.forEach((entry) => {
        const year = entry.date.split("-")[0];
        if (!value[year]) value[year] = [];
        const bullets = entry.bullets.map((bullet) => ({
            id: bullet.id,
            text: bullet.text,
        }));

        const words = bullets.reduce((total, bullet) => total + bullet.text.split(" ").length, 0);

        value[year].push({
            id: entry.id,
            date: entry.date,
            count: words,
            bullets: bullets,
        });

        totalWords += words;
    });

    return { value, totalWords };
}
