import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon } from "lucide-react";

export default function Hero() {
    return (
        <section
            className="relative overflow-hidden"
            
        >
            {/* Soft Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,46,70,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,46,70,0.035)_1px,transparent_1px)] bg-size-[56px_56px] pointer-events-none" />

            {/* Top Glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(120,198,227,.22) 0%, transparent 70%)",
                }}
            />

            {/* Left Blob */}
            <div
                className="absolute -left-36 top-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(158,212,232,.28), transparent 70%)",
                }}
            />

            {/* Right Blob */}
            <div
                className="absolute -right-40 bottom-20 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(120,198,227,.22), transparent 70%)",
                }}
            />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full mb-8"
                    style={{
                        background: "rgba(120,198,227,.15)",
                        border: "1px solid rgba(120,198,227,.25)",
                        color: "#2D4B61",
                    }}
                >
                    <span
                        className="size-1.5 rounded-full"
                        style={{ background: "#78C6E3" }}
                    />
                    AI-Powered Social Media Automation
                </div>

                {/* Heading */}
                <h1
                    className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl"
                    style={{ color: "#102E46" }}
                >
                    Post smarter.
                    <br />
                    <span
                        className="italic"
                        style={{ color: "#78C6E3" }}
                    >
                        Grow faster.
                    </span>
                </h1>

                {/* Description */}
                <p
                    className="mt-7 max-w-2xl mx-auto"
                    style={{ color: "#5F6B78" }}
                >
                    PostOn lets you create, schedule, and auto-engage across all
                    your social platforms — powered by AI that writes your
                    captions and replies for you.
                </p>

                {/* Buttons */}
                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/login"
                        className="rounded-full font-medium inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all duration-300"
                        style={{
                            background: "#102E46",
                            color: "#FFFFFF",
                            boxShadow:
                                "0 10px 25px rgba(16,46,70,.15)",
                        }}
                    >
                        Start for free
                        <ArrowRightIcon className="size-4" />
                    </Link>

                    <a
                        href="#how-it-works"
                        className="rounded-full font-medium inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all duration-300"
                        style={{
                            background: "#FFFFFF",
                            color: "#102E46",
                            border: "1px solid #DCEAF3",
                        }}
                    >
                        See how it works
                    </a>
                </div>

                <p
                    className="mt-5 text-xs"
                    style={{ color: "#7D8894" }}
                >
                    No credit card required · Free forever plan available
                </p>
            </div>

            {/* Dashboard */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                <div
                    className="rounded-t-3xl overflow-hidden"
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid #E8F1F5",
                        boxShadow:
                            "0 30px 70px rgba(16,46,70,.08)",
                    }}
                >
                    {/* Browser */}
                    <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{
                            background: "#F8FCFE",
                            borderBottom: "1px solid #E8F1F5",
                        }}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#78C6E3" }}
                        />
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#A7DDF0" }}
                        />
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: "#CFEFF9" }}
                        />

                        <div
                            className="flex-1 mx-4 rounded-md h-5 max-w-xs"
                            style={{ background: "#FFFFFF" }}
                        />
                    </div>

                    {/* Dashboard Content */}
                    <div
                        className="p-6"
                        style={{ background: "#F8FCFE" }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {[
                                { val: "12", label: "Scheduled" },
                                { val: "48", label: "Published" },
                                { val: "4", label: "Accounts" },
                                { val: "3", label: "AI Rules" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-xl p-4"
                                    style={{
                                        background: "#FFFFFF",
                                        border: "1px solid #E8F1F5",
                                    }}
                                >
                                    <div
                                        className="text-2xl font-bold tabular-nums"
                                        style={{ color: "#102E46" }}
                                    >
                                        {s.val}
                                    </div>

                                    <div
                                        className="text-xs mt-1"
                                        style={{ color: "#7D8894" }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="rounded-xl p-4 space-y-3"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid #E8F1F5",
                            }}
                        >
                            <div
                                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                                style={{ color: "#7D8894" }}
                            >
                                Recent Activity
                            </div>

                            {[
                                {
                                    text: "Post published to LinkedIn & Twitter",
                                    time: "2m ago",
                                },
                                {
                                    text: "AI replied to 3 comments",
                                    time: "15m ago",
                                },
                                {
                                    text: "New post scheduled for tomorrow 9am",
                                    time: "1h ago",
                                },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    className="flex items-center gap-3"
                                >
                                    <DotIcon
                                        className="size-5"
                                        style={{ color: "#78C6E3" }}
                                    />

                                    <span
                                        className="text-sm flex-1"
                                        style={{ color: "#5F6B78" }}
                                    >
                                        {item.text}
                                    </span>

                                    <span
                                        className="text-xs shrink-0"
                                        style={{ color: "#A5B3BF" }}
                                    >
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}