import { useEffect, useState } from "react";
import { PLATFORMS } from "../assets/assets";
import { CalendarDaysIcon, SendIcon, XIcon } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";

const Scheduler = () => {

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("")
  const [scheduledDate, setSetscheduledDate] = useState("")
  const [schduledTime, setSchduledTime] = useState("")
  const [selectPlatforms, setselectPlatforms] = useState([])
  const [mediaFile, setMediaFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/api/posts")
      setPosts(data.data) // server wraps the payload as { success, message, data }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load posts")
    }
  }

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []) // <- run once on mount, not on every render

  const scheduled = posts.filter((p) => p.status === "scheduled")
  const published = posts.filter((p) => p.status === "published")

  const togglePlatform = (id) => setselectPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const handleSchedule = async (e) => {
    e.preventDefault()
    if (selectPlatforms.length === 0) {
      toast.error("Select at least one platform")
      return;
    }
    if (!scheduledDate || !schduledTime) {
      toast.error("Select time and date")
      return;
    }
    if (selectPlatforms.includes('instagram') && !mediaFile) {
      toast.error("Instagram required an image or video")
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${schduledTime}`).toISOString();
    const formData = new FormData();
    formData.append("content", content)
    formData.append("scheduledFor", scheduledFor)
    formData.append("status", "scheduled") // was mistakenly sending the `scheduled` posts array
    formData.append("platforms", JSON.stringify(selectPlatforms))
    if (mediaFile) formData.append("media", mediaFile)
    console.log(mediaFile);

    setLoading(true)

    try {
      const { data } = await api.post('/api/posts', formData)
      setPosts((prev) => [data.data, ...prev])
      toast.success("Post Scheduled")
      setContent("");
      setSchduledTime("");
      setSetscheduledDate("");
      setselectPlatforms([]);
      setMediaFile(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to schedule post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="-mt-3">
      <div className="flex gap-5">

        {/* Compose panel */}
        <div className="rounded-xl border border-[#E8F1F5] bg-white shadow-sm h-fit w-115">
          <div className="border-b border-[#E8F1F5] px-6 py-4">
            <h2 className="text-xl text-[#102E46]">
              Compose Post
            </h2>
            <p className="mt-1 text-xs text-[#7D8894]">
              Create and schedule your social media content.
            </p>
          </div>

          <form onSubmit={handleSchedule} className="space-y-3 px-5 py-3">

            {/* Platform */}
            <div>
              <label className="mb-1 block text-xs text-[#5F6B78] uppercase">
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
                          ? "border-[#78C6E3] bg-[#EAF8FD] text-[#78C6E3]"
                          : "border-[#E8F1F5] bg-white text-[#7D8894] hover:border-[#CFEAF5] hover:bg-[#EAF8FD]"
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
              <label className="mb-1 block text-xs text-[#5F6B78] uppercase">
                Content
              </label>

              <textarea
                required
                rows={6}
                placeholder="What do you want to share today?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-[#E8F1F5] px-4 py-3 text-xs outline-none transition focus:border-[#78C6E3] focus:ring-2 focus:ring-[#78C6E3]/20"
              />

              <div
                className={`text-right text-xs ${content.length > 270
                  ? "text-[#78C6E3]"
                  : "text-[#7D8894]"
                  }`}
              >
                {content.length}/280
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-[#5F6B78]">
                Media (Optional)
              </label>

              {mediaFile ? (
                <div className="relative overflow-hidden rounded-xl border border-[#E8F1F5] bg-[#F1F8FC]">
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
                    className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-[#102E46]"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  <label className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#CFEAF5] bg-[#F1F8FC] transition-all duration-200 hover:border-[#78C6E3] hover:bg-[#EAF8FD]">
                    <span className="text-sm font-medium text-[#5F6B78]">
                      Click to upload image or video
                    </span>

                    <span className="mt-1 text-xs text-[#7D8894]">
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
                <label className="mb-2 block text-xs text-[#5F6B78] uppercase">
                  Schedule Date
                </label>

                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setSetscheduledDate(e.target.value)}
                  className="w-full rounded-xl border border-[#E8F1F5] px-4 py-3 outline-none focus:border-[#78C6E3] focus:ring-2 focus:ring-[#78C6E3]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#5F6B78] uppercase">
                  Schedule Time
                </label>

                <input
                  type="time"
                  value={schduledTime}
                  onChange={(e) => setSchduledTime(e.target.value)}
                  className="w-full rounded-xl border border-[#E8F1F5] px-4 py-3 outline-none focus:border-[#78C6E3] focus:ring-2 focus:ring-[#78C6E3]/20"
                />
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#102E46] px-5 py-3 text-white transition hover:bg-[#183D5C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Scheduling..." : "Schedule Post"}
            </button>

          </form>
        </div>

        {/* Queue panel */}
        <div className="flex-1 flex-col gap-6 min-w-0">

          {/* Upcoming post */}
          <div className="overflow-hidden rounded-2xl border border-[#E8F1F5] bg-white shadow-sm mb-5">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#E8F1F5] ">

              <CalendarDaysIcon className="size-4 text-[#7D8894]" />
              <h3 className="text-sm text-[#102E46]">
                Upcoming
              </h3>
              <span className="ml-auto text-xs font-bold bg-[#EAF8FD] text-[#2D4B61] px-2 py-0.5 rounded-full">
                {scheduled.length}
              </span>

            </div>

            {/* Body */}
            <div className="max-h-72 overflow-y-auto divide-y divide-[#E8F1F5]">
              {scheduled.length === 0 ? (
                <div className="py-10 text-center text-[#7D8894] text-sm">
                  No scheduled posts yet.
                </div>
              ) : (
                scheduled.map((post) => (
                  <div
                    key={post._id}
                    className="px-5 py-4 hover:bg-[#F1F8FC]/60 transition-colors border-b border-[#E8F1F5]"
                  >
                    <div className="flex items-start justify-between mb-2">

                      {/* Platforms */}
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map((pl) => {
                          const meta = PLATFORMS.find((p) => p.id === pl);

                          return meta ? (
                            <div
                              key={pl}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E8F1F5] bg-[#F1F8FC]"
                            >
                              <meta.icon className="size-4 text-[#5F6B78]" />
                            </div>
                          ) : null;
                        })}
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2">

                        {post.mediaType && (
                          <span className="text-xs bg-[#F1F8FC] text-[#5F6B78] border border-[#E8F1F5] px-1.5 py-0.5 rounded-md font-semibold capitalize">
                            {post.mediaType}
                          </span>
                        )}

                        <span className="text-xs text-[#7D8894]">
                          {new Date(post.scheduledFor).toLocaleString()}
                        </span>

                      </div>

                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5F6B78]">
                      {post.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Published post */}
          <div className="overflow-hidden rounded-2xl border border-[#E8F1F5] bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-[#E8F1F5] px-5 py-4">
              <SendIcon className="size-4 text-[#7D8894]" />

              <h3 className="text-sm text-[#102E46]">
                Published
              </h3>

              <span className="ml-auto rounded-full bg-[#EAF8FD] px-2 py-0.5 text-xs font-bold text-[#2D4B61]">
                {published.length}
              </span>
            </div>

            {/* Body */}
            <div className="max-h-72 overflow-y-auto divide-y divide-[#E8F1F5]">
              {published.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#7D8894]">
                  No published posts yet.
                </div>
              ) : (
                published.map((post) => (
                  <div
                    key={post._id}
                    className="px-5 py-4 transition-colors hover:bg-[#F1F8FC]/60 border-b border-[#E8F1F5]"
                  >
                    <div className="mb-2 flex items-start justify-between">

                      {/* Platforms */}
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map((pl) => {
                          const meta = PLATFORMS.find((p) => p.id === pl);

                          return meta ? (
                            <div
                              key={pl}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E8F1F5] bg-[#F1F8FC]"
                            >
                              <meta.icon className="size-4 text-[#5F6B78]" />
                            </div>
                          ) : null;
                        })}
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-2">

                        {post.mediaType && (
                          <span className="rounded-md border border-[#E8F1F5] bg-[#F1F8FC] px-1.5 py-0.5 text-xs font-semibold capitalize text-[#5F6B78]">
                            {post.mediaType}
                          </span>
                        )}

                        <span className="text-xs text-[#7D8894]">
                          {new Date(post.updatedAt).toLocaleString()}
                        </span>

                        <span className="rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-600">
                          Published
                        </span>

                      </div>
                    </div>

                    {/* Content */}
                    <p className="line-clamp-2 text-sm leading-6 text-[#5F6B78]">
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