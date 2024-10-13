import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `http://localhost:5000/api/comments`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
