export function calculateCurrentStreak(entries) {
    if (!entries) return 0;

    let currentDate = new Date();
    let currentDateString = currentDate.toISOString().split("T")[0];

    let streak = 0;
    let i = 0;
    while (i < entries.length) {
        if (entries[i].date === currentDateString) {
            i = 0;
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
            currentDateString = currentDate.toISOString().split("T")[0];
        }
        i++;
    }

    return streak;
} // calculate the current streak of entries(continuous days with entries, up to today)

export function calculateAverageWordsPerEntry(entries) {
    // average words per entry for a given year (meant to be used with formatEntries)
    const days = entries.length;
    const totalWords = entries.reduce((total, entry) => total + entry.count, 0);

    return Math.round(totalWords / days);
}

export default function formatEntries(entries) {
    const data = {};
    let totalWords = 0;

    entries.forEach((entry) => {
        const year = entry.date.split("-")[0];
        if (!data[year]) {
            data[year] = {
                entries: [], // entries for the year
                totalWords: 0, // total words for the year
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

    Object.keys(data).forEach(
        (year) => (data[year].avgWordsPerEntry = calculateAverageWordsPerEntry(data[year].entries))
    );

    return { data, totalWords };
}
