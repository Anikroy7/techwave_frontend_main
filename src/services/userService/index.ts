import { FieldValues } from "react-hook-form";

export const updateFollwers = async (
    userId: string,
    followData: FieldValues
  ) => {
  
    const url = `https://techwave-backend-six.vercel.app/api/users/${userId}`;
  
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