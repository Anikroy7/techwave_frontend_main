export const getCategories = async () => {
    const res = await fetch(`http://localhost:5000/api/category`)
    return await res.json()
}