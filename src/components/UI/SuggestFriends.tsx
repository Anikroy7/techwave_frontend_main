"use client"

import { useUser } from '@/src/context/user.provider';
import { useGetAllUsers } from '@/src/hooks/user.hook'
import { TUser } from '@/src/types';
import React, { useState } from 'react'

export default function SuggestFriends() {
    const { data, isPending } = useGetAllUsers();
    const { user } = useUser()
    const [visibleCount, setVisibleCount] = useState(4);

    const handleShowMore = () => {
        setVisibleCount((prev) => (prev === 4 ? data.length : 4));
    };

    console.log(user)

    return (
        <>
            {isPending && <p>Loading...</p>}
            <div className="space-y-4">
                <ul>
                    {data?.data?.filter((us: TUser) => us._id !== user?.userId).slice(0, visibleCount).map((user: TUser) => (
                        <li key={user._id} className="flex items-center space-x-3 space-y-4">
                            <img
                                src={user.profileImage || "/default-user.jpg"} // Fallback image if none provided
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="text-sm font-semibold">{user.name}</h4>

                                <button className="text-xs text-blue-600 hover:underline">
                                    Send request
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {data?.data?.length > 4 && (
                    <button
                        onClick={handleShowMore}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        {visibleCount === 4 ? "See All" : "Show Less"}
                    </button>
                )}
            </div>
        </>
    )
}
