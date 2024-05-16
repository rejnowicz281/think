"use server";

import getWrittenEntryDates from ".";

export default async (month: number, year: number) => getWrittenEntryDates(month, year);
