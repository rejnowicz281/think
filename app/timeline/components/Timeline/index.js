"use client";

import HeatMap from "@uiw/react-heat-map";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import formatEntries from "./lib/formatEntries";

export default function Timeline({ entries }) {
    const { data, totalWords } = formatEntries(entries);
    const [year, setYear] = useState(Object.keys(data)[0]);
    const [selected, setSelected] = useState("");

    const value = data[year].entries;
    const totalYearWords = data[year].totalWords;

    return (
        <>
            <select
                value={year}
                onChange={(e) => {
                    setSelected("");
                    setYear(e.target.value);
                }}
            >
                {Object.keys(data).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <p>
                {totalYearWords} {totalYearWords == 1 ? "word" : "words"} in {year} / {totalWords} total
            </p>
            <HeatMap
                value={value}
                weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
                monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                startDate={new Date(`${year}/01/01`)}
                endDate={new Date(`${year}/12/31`)}
                panelColors={{
                    0: "#EBEDF0",
                    25: "#8cd98c",
                    50: "#53c653",
                    100: "#339933",
                    150: "#206020",
                    200: "#0f3f0f",
                }}
                fontFamily="Arial"
                rectSize={16}
                width={999}
                legendCellSize={0}
                rectRender={(props, data) => {
                    if (selected !== "") props.opacity = data.date === selected.date ? 1 : 0.45;

                    return (
                        <rect
                            onClick={() => setSelected(data.date == selected.date ? "" : data)}
                            className="cell-tooltip"
                            data-tooltip-content={
                                data.count
                                    ? `${data.count} ${data.count == 1 ? "word" : "words"} on ${data.date}`
                                    : `No entry on ${data.date}`
                            }
                            {...props}
                        />
                    );
                }}
            />
            <Tooltip anchorSelect=".cell-tooltip" place="bottom" />
            {selected !== "" &&
                (selected.id ? (
                    <>
                        <p>
                            {selected.count} {selected.count == 1 ? "word" : "words"} on{" "}
                            <Link href={`/entries/${selected.id}`}>{selected.date}</Link>
                        </p>
                        <ul>
                            {selected.bullets?.map((bullet) => (
                                <li key={bullet.id}>{bullet.text}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div>
                        <p>No entry on {selected.date}</p>
                    </div>
                ))}
        </>
    );
}
