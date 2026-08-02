import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Connect Your Accounts",
        description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
    },
    {
        step: "02",
        title: "Create or Generate Content",
        description: "Write your own post or let our AI craft a caption and image based on your prompt.",
    },
    {
        step: "03",
        title: "Schedule & Publish",
        description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 ">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-[#78C6E3]/15 border border-[#78C6E3]/25 text-[#2D4B61] text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                        <CheckCircleIcon className="size-3" />
                        Simple setup
                    </div>

                    <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-[#102E46]">
                        Up and running in{" "}
                        <span className="text-[#78C6E3] italic">minutes</span>
                    </h2>

                    <p className="mt-5 text-[#5F6B78] max-w-lg mx-auto leading-relaxed">
                        No complicated onboarding, no steep learning curve. Just
                        connect, create, and grow.
                    </p>
                </div>

                <div className="space-y-6">
                    {steps.map((s, i) => (
                        <div
                            key={s.step}
                            className="flex gap-6 items-start bg-white rounded-2xl p-6 border border-[#E8F1F5] shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="shrink-0 size-12 rounded-2xl bg-[#EAF8FD] border border-[#CFEAF5] flex items-center justify-center">
                                <span className="text-sm font-medium text-[#102E46]">
                                    {s.step}
                                </span>
                            </div>

                            <div className="pt-1">
                                <h3 className="text-[#102E46] mb-1">
                                    {s.title}
                                </h3>

                                <p className="text-[#5F6B78] text-sm leading-relaxed">
                                    {s.description}
                                </p>
                            </div>

                            {i < steps.length - 1 && (
                                <div className="hidden sm:block ml-auto shrink-0 self-center">
                                    <ArrowRightIcon className="size-4 text-[#A7C9D9]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}