'use client';
import Image from "next/image";

//pour l'image du login à coté du menu hamburger
const Avatar = () => {
    return (
        <div>
            <Image
                className="rounded-full"
                height="30"
                width="30"
                src="/images/placeholder.jpg"
                alt="Avatar"
            />
        </div>
    );
}

export default Avatar;