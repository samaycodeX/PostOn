import { useEffect, useState } from "react";
import { dummyPostsData, PLATFORMS } from "../assets/assets";
import { CalendarDaysIcon, SendIcon, XIcon } from "lucide-react";

const Scheduler = () => {

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("")
  const [scheduledDate, setSetscheduledDate] = useState("")
  const [schduledTime, setSchduledTime] = useState("")
  const [selectPlatforms, setselectPlatforms] = useState([])
  const [mediaFile, setMediaFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    (async () => await fetchPosts())();
    const interval = setInterval(async () => await fetchPosts(), 1000);
    return () => clearInterval(interval);
  })

  const scheduled = posts.filter((p) => p.status === "scheduled")
  const published = posts.filter((p) => p.status === "published")

  const togglePlatform = (id) => setselectPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const handleSchedule = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPosts((preb) => [...prev, dummyPostsData[0]])
    }, 1000)
  }

  return (
    <div className="-mt-3">
      <div className="flex gap-5">

        {/* Compose panel */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm h-fit w-115">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl text-slate-800">
              Compose Post
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Create and schedule your social media content.
            </p>
          </div>

          <form onSubmit={handleSchedule} className="space-y-3 px-5 py-3">

            {/* Platform */}
            <div>
              <label className="mb-1 block text-xs text-slate-700 uppercase">
                Platform
              </label>

              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map((p) => {
                  const active = selectPlatforms.includes(p.id);

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all
                      ${active
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

            {/* Content */}
            <div>
              <label className="mb-1 block text-xs text-slate-700 uppercase">
                Content
              </label>

              <textarea
                required
                rows={6}
                placeholder="What do you want to share today?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />

              <div
                className={`text-right text-xs ${content.length > 270
                  ? "text-red-500"
                  : "text-slate-500"
                  }`}
              >
                {content.length}/280
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-slate-700">
                Media (Optional)
              </label>

              {mediaFile ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {mediaFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(mediaFile)}
                      alt="preview"
                      className="h-72 w-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(mediaFile)}
                      controls
                      className="h-72 w-full object-cover"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                    className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-red-500"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  <label className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition-all duration-200 hover:border-red-400 hover:bg-red-50">
                    <span className="text-sm font-medium text-slate-700">
                      Click to upload image or video
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      PNG, JPG, JPEG, GIF, MP4
                    </span>

                    <input
                      type="file"
                      accept="image/*, video/*"
                      onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs text-slate-700 uppercase">
                  Schedule Date
                </label>

                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setSetscheduledDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-700 uppercase">
                  Schedule Time
                </label>

                <input
                  type="time"
                  value={schduledTime}
                  onChange={(e) => setSchduledTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Scheduling..." : "Schedule Post"}
            </button>

          </form>
        </div>

        {/* Queue panel */}
        <div className="flex-1 flex-col gap-6 min-w-0">

          {/* Upcoming post */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-5">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-200 ">

              <CalendarDaysIcon className="size-4 text-zinc-500" />
              <h3 className="text-sm text-slate-900">
                Upcoming
              </h3>
              <span className="ml-auto text-xs font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full">
                {scheduled.length}
              </span>

            </div>

            {/* Body */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {scheduled.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-sm">
                  No scheduled posts yet.
                </div>
              ) : (
                scheduled.map((post) => (
                  <div
                    key={post._id}
                    className="px-5 py-4 hover:bg-slate-50/60 transition-colors border-b border-slate-100"
                  >
                    <div className="flex items-start justify-between mb-2">

                      {/* Platforms */}
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map((pl) => {
                          const meta = PLATFORMS.find((p) => p.id === pl);

                          return meta ? (
                            <div
                              key={pl}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50"
                            >
                              <meta.icon className="size-4 text-slate-600" />
                            </div>
                          ) : null;
                        })}
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2">

                        {post.mediaType && (
                          <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded-md font-semibold capitalize">
                            {post.mediaType}
                          </span>
                        )}

                        <span className="text-xs text-slate-500">
                          {new Date(post.scheduledFor).toLocaleString()}
                        </span>

                      </div>

                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-700">
                      {post.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Published post */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4">
              <SendIcon className="size-4 text-zinc-500" />

              <h3 className="text-sm text-slate-900">
                Published
              </h3>

              <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-700">
                {published.length}
              </span>
            </div>

            {/* Body */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {published.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-400">
                  No published posts yet.
                </div>
              ) : (
                published.map((post) => (
                  <div
                    key={post._id}
                    className="px-5 py-4 transition-colors hover:bg-slate-50/60 border-b border-slate-100"
                  >
                    <div className="mb-2 flex items-start justify-between">

                      {/* Platforms */}
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map((pl) => {
                          const meta = PLATFORMS.find((p) => p.id === pl);

                          return meta ? (
                            <div
                              key={pl}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50"
                            >
                              <meta.icon className="size-4 text-slate-600" />
                            </div>
                          ) : null;
                        })}
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2">

                        {post.mediaType && (
                          <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-xs font-semibold capitalize text-slate-600">
                            {post.mediaType}
                          </span>
                        )}

                        <span className="text-xs text-slate-500">
                          {new Date(post.updatedAt).toLocaleString()}
                        </span>

                        <span className="rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-600">
                          Published
                        </span>

                      </div>
                    </div>

                    {/* Content */}
                    <p className="line-clamp-2 text-sm leading-6 text-slate-700">
                      {post.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Scheduler