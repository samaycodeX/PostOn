import {
    CalendarDaysIcon,
    Wand2Icon,
    Share2Icon,
    ZapIcon,
    BarChart3Icon,
    HashIcon,
} from "lucide-react";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description:
            "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description:
            "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.",
    },
    {
        icon: BarChart3Icon,
        title: "Activity Dashboard",
        description:
            "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform",
        description:
            "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description:
            "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.",
    },
    {
        icon: HashIcon,
        title: "Hashtag Suggestions",
        description:
            "Get AI-powered hashtag suggestions to reach a wider audience.",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="py-24"
            style={{ background: "#F1F8FC" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div
                        className="mb-6 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full"
                        style={{
                            background: "rgba(120,198,227,.15)",
                            border: "1px solid rgba(120,198,227,.25)",
                            color: "#2D4B61",
                        }}
                    >
                        <ZapIcon className="size-3" />
                        Everything you need
                    </div>

                    <h2
                        className="font-serif text-4xl sm:text-5xl font-medium leading-tight"
                        style={{ color: "#102E46" }}
                    >
                        Automate your entire
                        <br />
                        <span
                            className="italic"
                            style={{ color: "#78C6E3" }}
                        >
                            social media workflow
                        </span>
                    </h2>

                    <p
                        className="mt-5 max-w-xl mx-auto leading-relaxed"
                        style={{ color: "#5F6B78" }}
                    >
                        From content creation to scheduling — Scheduler handles
                        it all so you can focus on what matters most.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group rounded-2xl p-6 transition-all duration-300"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid #E8F1F5",
                                boxShadow:
                                    "0 8px 24px rgba(16,46,70,.05)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-6px)";
                                e.currentTarget.style.boxShadow =
                                    "0 18px 40px rgba(16,46,70,.10)";
                                e.currentTarget.style.borderColor = "#BFE3F2";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 24px rgba(16,46,70,.05)";
                                e.currentTarget.style.borderColor = "#E8F1F5";
                            }}
                        >
                            <div
                                className="size-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#7BC9E8,#B9EBFA)",
                                    color: "#102E46",
                                }}
                            >
                                <f.icon className="size-5" />
                            </div>

                            <h3
                                className="mb-2"
                                style={{ color: "#102E46" }}
                            >
                                {f.title}
                            </h3>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "#5F6B78" }}
                            >
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}