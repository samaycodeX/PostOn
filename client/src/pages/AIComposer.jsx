import { useEffect, useState } from "react"
import { dummyGenerationData, PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarIcon, ClockIcon, History, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react";


const AIComposer = () => {

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState([])

  // Scheduling State
  const [activeScheduler, setActiveScheduler] = useState(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [scheduling, setScheduling] = useState(false)

  const fetchGenerations = async () => {
    setGenerations(dummyGenerationData);
  }

  useEffect(() => {
    fetchGenerations();
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }

  const handleSchedule = async () => {
    setScheduling(true)
    setTimeout(() => {
      setScheduling(false)
    }, 2000)
  }

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"]


  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">


      {/* Input Section */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <h1 className="border-b border-slate-200 px-6 py-5 text-xl text-slate-900 ">
          What should we create today?
        </h1>

        <div className="p-6 space-y-5">

          <textarea
            placeholder="Share your idea... (e.g. A post about the lauch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            rows={6}
          />

          <div className="flex items-center justify-between gap-4">

            <button
              onClick={() => setGenerateImage(!generateImage)}
              className="flex items-center gap-3 text-sm text-slate-700"
            >
              <span>AI Image</span>

              <div
                className={`flex h-4.5 w-9.5 items-center rounded-full transition ${generateImage ? "bg-red-500" : "bg-slate-300"
                  }`}
              >
                <span
                  className={`block h-4 w-4 rounded-full bg-white shadow transition ${generateImage
                    ? "translate-x-5"
                    : "translate-x-0.5"
                    }`}
                />
              </div>
            </button>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate</span>
                  <ArrowRightIcon className="size-4" />
                </>
              )}
            </button>

          </div>

        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-200 px-6 py-4">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${tone === t
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:bg-red-50"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* AI Generated Posts */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 ">

        <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4 bg-white">
          <div className="flex items-center gap-2">
            <HistoryIcon className="size-4 text-zinc-500" />
            <h2 className="text-sm text-slate-900">
              Recent Generations
            </h2>
          </div>

          <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-xs  text-red-500">
            {generations.length} total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-y-auto divide-y divide-slate-100 p-5 gap-6 max-h-120">

          {generations.map((gen) => (
            <div
              key={gen._id}
              className="p-4 transition-all group bg-white rounded-xl border border-slate-100 hover:border-red-200 relative overflow-hidden"
            >
              <div className="flex flex-col h-full space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-slate-500 uppercase tracking-tight">
                    {new Date(gen.createdAt).toLocaleString()}
                  </span>

                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs  text-red-500">
                    {gen.tone}
                  </span>

                </div>
                <p className="text-xs leading-relaxed flex-1 text-slate-700 line-clamp-3">
                  {gen.content}
                </p>

                {gen.mediaUrl && (
                  <div className="overflow-hidden rounded-xl border border-slate-50 bg-slate-50">
                    <img
                      src={gen.mediaUrl}
                      alt="Gen"
                      className="w-full object-cover aspect-video opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveScheduler(gen)}
                    className="flex-1 bg-slate-100 rounded-xl border border-slate-200 px-4 py-2.25 text-xs text-slate-600 transition  hover:bg-red-500 hover:text-white"
                  >
                    Schedule Post
                  </button>
                </div>
              </div>



            </div>
          ))}

          {generations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">

              <div className="mb-4 rounded-full bg-red-50 p-4">
                <Wand2Icon className="size - 6 text-red-500" />
              </div>

              <p className="max-w-sm text-center text-sm leading-6 text-slate-500">
                No content genreted yet. Try generating some content using the AI.
              </p>

            </div>
          )}

        </div>

      </div>

      {/* Scheduler Modal */}

      {activeScheduler && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shrink-0">

              <h3 className="text-lg text-slate-900">
                Schedule Generation
              </h3>

              <button
                onClick={() => setActiveScheduler(null)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <XIcon className="size-5" />
              </button>

            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
                  Prompt
                </label>

                <p className="text-sm leading-6 text-slate-700">
                  {activeScheduler.prompt}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">

                <label className="mb-2 block text-xs uppercase tracking-wide text-slate-500">
                  Generated Content
                </label>

                <p className="text-sm leading-6 text-slate-700">
                  {activeScheduler.content}
                </p>

                {activeScheduler.mediaUrl && (
                  <img
                    src={activeScheduler.mediaUrl}
                    alt="preview"
                    className="mt-4 max-h-72 w-full rounded-xl border border-slate-200 object-cover"
                  />
                )}

              </div>

            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-200 p-6 space-y-5">

              {/* options */}
              <div>

                <label className="mb-3 block text-xs uppercase tracking-wide text-slate-700">
                  Select Platforms
                </label>

                <div className="flex flex-wrap gap-3">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);

                    return (
                      <button
                        key={p.id}
                        onClick={() =>
                          setSelectedPlatforms((prev) =>
                            prev.includes(p.id)
                              ? prev.filter((x) => x !== p.id)
                              : [...prev, p.id]
                          )
                        }
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${active
                          ? "border-red-500 bg-red-50 text-red-500"
                          : "border-slate-200 bg-white text-slate-500 hover:border-red-300 hover:bg-red-50"
                          }`}
                      >
                        <p.icon className="size-4" />
                      </button>
                    );
                  })}
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 h-11">
                  <CalendarIcon className="size-4 text-slate-500" />

                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 h-11">
                  <ClockIcon className="size-4 text-slate-500" />

                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

              </div>

              <button
                onClick={handleSchedule}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-medium text-white transition hover:bg-red-600"
              >
                {scheduling ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <TimerIcon className="size-4" />
                )}

                Schedule Post
              </button>

            </div>

          </div>
        </div>
      )}

    </div>



  )
}

export default AIComposer