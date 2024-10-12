import { defalutImage } from "../constant";

const uploadImage = async (imageFile: File) => {
    const url = 'https://api.imgbb.com/1/upload?key=47939f6304aae8b97c9f1a872785ee6f';
    let newImageUrl = defalutImage;
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const imgData = await res.json();
        if (imgData.success) {
            newImageUrl = imgData.data.display_url
        } else {
            console.error('Error from imgbb:', imgData.error.message);
        }
    } catch (err) {
        console.error('Error uploading image:', err);
    }


    return newImageUrl;
};


export default uploadImage;
