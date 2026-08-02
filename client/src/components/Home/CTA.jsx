import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
    return (
        <section
            className="py-20 relative overflow-hidden"
            style={{ background: "#F1F8FC" }}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div
                    className="relative rounded-3xl overflow-hidden p-14 sm:p-20 text-center"
                    style={{
                        background:
                            "linear-gradient(135deg, #FFFFFF 0%, #F8FCFE 60%, #EAF8FD 100%)",
                        border: "1px solid #E8F1F5",
                        boxShadow: "0 15px 40px rgba(16,46,70,.08)",
                    }}
                >
                    {/* Background Blobs */}
                    <div
                        className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(120,198,227,.18) 0%, transparent 70%)",
                        }}
                    />

                    <div
                        className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(158,212,232,.18) 0%, transparent 70%)",
                        }}
                    />

                    <div className="relative z-10">
                        <div
                            className="mb-6 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full"
                            style={{
                                background: "rgba(120,198,227,.15)",
                                border: "1px solid rgba(120,198,227,.25)",
                                color: "#2D4B61",
                            }}
                        >
                            Ready to grow?
                        </div>

                        <h2
                            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium"
                            style={{ color: "#102E46" }}
                        >
                            Automate your social
                            <br />
                            <span
                                className="italic"
                                style={{ color: "#78C6E3" }}
                            >
                                media today
                            </span>
                        </h2>

                        <p
                            className="mt-6 max-w-lg mx-auto text-lg"
                            style={{ color: "#5F6B78" }}
                        >
                            Join thousands of creators and marketers who trust
                            Scheduler to grow their audience on autopilot.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/login"
                                className="rounded-full font-semibold inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center transition-all duration-300"
                                style={{
                                    background: "#102E46",
                                    color: "#FFFFFF",
                                    boxShadow:
                                        "0 10px 25px rgba(16,46,70,.15)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#183D5C";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#102E46";
                                }}
                            >
                                Get Started Free
                                <ArrowRightIcon className="size-4" />
                            </Link>

                            <a
                                href="#pricing"
                                className="rounded-full font-medium inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center transition-all duration-300"
                                style={{
                                    background: "#FFFFFF",
                                    color: "#102E46",
                                    border: "1px solid #DCEAF3",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#F8FCFE";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#FFFFFF";
                                }}
                            >
                                View Pricing
                            </a>
                        </div>

                        <p
                            className="mt-6 text-xs"
                            style={{ color: "#7D8894" }}
                        >
                            No credit card required · Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}