"use client";

import getFilteredBullets from "@/actions/journal/read/get-filtered-bullets/server";
import Loading from "@/components/general/loading";
import BulletLink from "@/components/search-page/bullet-link";
import useDebounce from "@/hooks/use-debounce";
import { Bullet } from "@/types/bullet";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [loading, setLoading] = useState(false);
    const [bullets, setBullets] = useState<Bullet[]>([]);

    useEffect(() => {
        const populateUsers = async () => {
            if (searchQuery.length === 0) {
                setBullets([]);
                return;
            }

            setLoading(true);
            const { bullets } = await getFilteredBullets(debouncedSearch.trim());
            setLoading(false);

            if (bullets) setBullets(bullets);
        };

        populateUsers();
    }, [debouncedSearch]);

    return (
        <div className="flex-1 flex flex-col max-w-[700px] w-full mx-auto px-6 py-16 gap-5">
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for a bullet..."
                className="p-2 border border-neutral-300 rounded-md"
            />
            <div className="flex flex-col gap-5">
                {loading ? (
                    <div className="mt-6">
                        <Loading />
                    </div>
                ) : (
                    bullets.map((bullet) => <BulletLink key={bullet.id} bullet={bullet} />)
                )}
            </div>
        </div>
    );
}
