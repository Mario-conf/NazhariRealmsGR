import { FaWhatsapp, FaSpotify, FaStrava, FaInstagram } from "react-icons/fa6";

export const siteConfig = {
    name: "Nazhari Realms GR",
    logo: "/images/logo.png", // Path in the public directory
    logoHint: "logo club",
    socialLinks: [
        { name: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=00292442802', Icon: FaWhatsapp, colorClass: 'hover:text-[#25D366]' },
        { name: 'Spotify', href: 'https://open.spotify.com/playlist/3GhlwrQQJzdBgh0mod4dnm?si=OqOYa4oTT4etDBWWs6-YPw&pi=c6LqInruTKaO4', Icon: FaSpotify, colorClass: 'hover:text-[#1DB954]' },
        { name: 'Strava', href: '#!', Icon: FaStrava, colorClass: 'hover:text-[#FC4C02]' },
        { name: 'Instagram', href: 'https://instagram.com/nazharirealmsgr', Icon: FaInstagram, colorClass: 'hover:text-[#E4405F]' },
    ]
}
