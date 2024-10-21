export const getCategories = async () => {
  const res = await fetch(`https://techwave-backend-six.vercel.app/api/category`);

  return await res.json();
};
