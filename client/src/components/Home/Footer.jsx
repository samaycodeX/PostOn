import { Link } from "react-router-dom";

const footerLinks = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer
            style={{
                
                borderTop: "1px solid #E8F1F5",
            }}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            to="/"
                            onClick={() => scrollTo(0, 0)}
                            className="inline-flex items-center gap-2 mb-5"
                        >
                            <img
                                src="/logo.svg"
                                alt="logo"
                                className="size-6"
                            />
                            <span
                                className="font-medium font-serif text-xl"
                                style={{ color: "#102E46" }}
                            >
                                PostOn
                            </span>
                        </Link>

                        <p
                            className="text-sm leading-relaxed max-w-xs"
                            style={{ color: "#5F6B78" }}
                        >
                            The AI-powered social media scheduler that helps
                            creators and teams grow faster with less effort.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div
                                className="text-xs font-semibold uppercase tracking-widest mb-5"
                                style={{ color: "#2D4B61" }}
                            >
                                {category}
                            </div>

                            <ul className="space-y-1">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm transition-colors duration-200"
                                            style={{ color: "#5F6B78" }}
                                            onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "#102E46")
                                            }
                                            onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                "#5F6B78")
                                            }
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
                    style={{
                        borderTop: "1px solid #E8F1F5",
                    }}
                >
                    <p
                        className="text-xs"
                        style={{ color: "#7D8894" }}
                    >
                        © {new Date().getFullYear()} PostOn. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-xs transition-colors duration-200"
                            style={{ color: "#7D8894" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#102E46")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#7D8894")
                            }
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="text-xs transition-colors duration-200"
                            style={{ color: "#7D8894" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#102E46")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#7D8894")
                            }
                        >
                            Terms of Service
                        </a>

                        <Link
                            to="/login"
                            className="text-xs transition-colors duration-200"
                            style={{ color: "#7D8894" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#102E46")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#7D8894")
                            }
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}