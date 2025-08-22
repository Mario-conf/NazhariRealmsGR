import { FaWhatsapp, FaSpotify, FaStrava, FaInstagram } from "react-icons/fa6";

export const siteConfig = {
    name: "Nazhari Realms GR",
    logo: "/images/logo.png", // Path in the public directory
    logoHint: "logo club",
    socialLinks: [
        { name: 'WhatsApp', href: '#!', Icon: FaWhatsapp, colorClass: 'hover:text-[#25D366]' },
        { name: 'Spotify', href: '#!', Icon: FaSpotify, colorClass: 'hover:text-[#1DB954]' },
        { name: 'Strava', href: '#!', Icon: FaStrava, colorClass: 'hover:text-[#FC4C02]' },
        { name: 'Instagram', href: '#!', Icon: FaInstagram, colorClass: 'hover:text-[#E4405F]' },
    ]
}
