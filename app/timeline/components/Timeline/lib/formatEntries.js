export default function formatEntries(entries) {
    const data = {};
    let totalWords = 0;

    entries.forEach((entry) => {
        const year = entry.date.split("-")[0];
        if (!data[year]) {
            data[year] = {
                entries: [],
                totalWords: 0,
            };
        }

        const bullets = entry.bullets?.map((bullet) => ({
            id: bullet.id,
            text: bullet.text,
        }));

        const words = bullets?.reduce((total, bullet) => total + bullet.text.split(" ").length, 0) || 0;

        data[year].entries.push({
            id: entry.id,
            date: entry.date,
            count: words,
            bullets: bullets,
        });

        data[year].totalWords += words;

        totalWords += words;
    });

    return { data, totalWords };
}
