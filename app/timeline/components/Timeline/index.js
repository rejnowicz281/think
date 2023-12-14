"use client";

import HeatMap from "@uiw/react-heat-map";
import Link from "next/link";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import formatEntries from "./lib/formatEntries";

export default function Timeline({ entries }) {
    const { value, totalWords } = formatEntries(entries);
    const [year, setYear] = useState(Object.keys(value)[0]);
    const [selected, setSelected] = useState("");

    return (
        <>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
                {Object.keys(value).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <p>
                {totalWords} {totalWords < 2 ? "word" : "words"} in {year}
            </p>
            <HeatMap
                value={value[year]}
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
                                    ? `${data.count} ${data.count < 2 ? "word" : "words"} on ${data.date}`
                                    : `No entry on ${data.date}`
                            }
                            {...props}
                        />
                    );
                }}
            />
            <Tooltip anchorSelect=".cell-tooltip" place="bottom" />
            {selected !== "" &&
                (selected.count > 0 ? (
                    <>
                        <p>
                            {selected.count} {selected.count < 2 ? "word" : "words"} on{" "}
                            <Link href={`/entries/${selected.id}`}>{selected.date}</Link>
                        </p>
                        <ul>
                            {selected.bullets.map((bullet) => (
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
