import { Link } from "react-router";
import { FaLeaf } from "react-icons/fa";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer
            className="pt-16 mt-20"
            style={{
                background:
                    "var(--footer-color-bg)",
                color: "var(--footer-text)"
            }}
        >
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--color-primary)" }}
                        >
                            <FaLeaf className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            GardenHub
                        </h2>
                    </div>

                    <p className="text-sm leading-relaxed text-white/80">
                        A vibrant community for gardening enthusiasts to share
                        knowledge, connect with fellow gardeners, and grow
                        together.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/explore-gardener">Explore Gardeners</Link></li>
                        <li><Link to="/tips">Browse Tips</Link></li>
                        <li><Link to="/share-tip">Share a Tip</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">
                        Contact Us
                    </h3>
                    <ul className="space-y-2 text-sm text-white/80">
                        <li>✉ contact@gardenhub.com</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>📍 123 Garden Street, Green City</li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">
                        Follow Us
                    </h3>

                    <div className="flex gap-3 mb-4">
                        {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                            (Icon, i) => (
                                <span
                                    key={i}
                                    className="w-9 h-9 rounded-full flex items-center justify-center transition cursor-pointer"
                                    style={{
                                        backgroundColor: "var(--color-primary)",
                                        color: "#ffffff"
                                    }}
                                >
                                    <Icon />
                                </span>
                            )
                        )}
                    </div>

                    <Link
                        to="/terms"
                        className="text-sm underline text-white/80"
                    >
                        Terms & Conditions
                    </Link>
                </div>
            </div>

            {/* Divider */}
            <div
                className="mt-12"
                style={{ borderTop: "1px solid var(--footer-divider)" }}
            />

            {/* Bottom */}
            <div className="text-center py-6 text-sm text-white/80">
                © {new Date().getFullYear()} GardenHub. All rights reserved.
                Cultivating communities, one garden at a time.
            </div>
        </footer>
    );
};

export default Footer;
