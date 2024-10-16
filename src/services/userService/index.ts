
export const updateFollowers = async (
    followData: {
        userId: string,
        followingId: string,
        type?: 'add' | 'delete',
    }
) => {

    const url = `http://localhost:5000/api/users/${followData.type}-followers`;
    delete followData.type
    console.log(followData)
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(followData),
        });
        const result = await res.json();

        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};