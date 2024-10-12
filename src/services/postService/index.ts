import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
    // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
    const url = `http://localhost:5000/api/posts`
    try {
        const res = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        const result = await res.json();
        // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
        return result
    } catch (error: any) {
        throw new Error(error);
    }

};