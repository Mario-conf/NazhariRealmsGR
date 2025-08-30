import { FaWhatsapp, FaSpotify, FaStrava, FaInstagram, FaFacebook } from "react-icons/fa6";

export const siteConfig = {
    name: "Nazhari Realms GR",
    logo: "/logo.png", // Path in the public directory
    logoHint: "logo club",
    socialLinks: [
        { name: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Vb2kFn442Dcl8E0bUT2k', Icon: FaWhatsapp, colorClass: 'hover:text-[#25D366]' },
        { name: 'Spotify', href: 'https://open.spotify.com/playlist/3GhlwrQQJzdBgh0mod4dnm?si=OqOYa4oTT4etDBWWs6-YPw&pi=c6LqInruTKaO4', Icon: FaSpotify, colorClass: 'hover:text-[#1DB954]' },
        { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580029080711', Icon: FaFacebook, colorClass: 'hover:text-[#1877F2]' },
        { name: 'Strava', href: 'https://g.page/r/CaqIcWCpANMnEBI/review', Icon: FaStrava, colorClass: 'hover:text-[#FC4C02]' },
        { name: 'Instagram', href: 'https://instagram.com/nazharirealmsgr', Icon: FaInstagram, colorClass: 'hover:text-[#E4405F]' },
    ]
}
