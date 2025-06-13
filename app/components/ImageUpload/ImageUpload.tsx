import React from 'react'

const ImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            //setCustomImage(reader.result as string); // Data URL
        };
        reader.readAsDataURL(file);
    }
};

export default ImageUpload