"use server";

import getFilteredBullets from ".";

export default async (filter: string) => getFilteredBullets(filter);
