import { ActivityIcon, CheckCheckIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyAccountsData, dummyActivityData, dummyPostsData } from '../assets/assets.jsx'

const Dashboard = () => {

  const [stats, setStats] = useState({ scheduled: 0, published: 0, connectedAccounts: 0 })
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const posts = dummyPostsData;

        setStats({
          scheduled: posts.filter((p) => p.status === "scheduled").length,
          published: posts.filter((p) => p.status === "published").length,
          connectedAccounts: dummyAccountsData.filter(
            (a) => a.status === "connected"
          ).length,
        });

        setActivities(dummyActivityData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboardData();
  }, []);

  const STATS_CARDS = [
    { label: "Scheduled Posts", value: stats.scheduled, icon: ClockIcon, trend: "+2 today" },
    { label: "Published Posts", value: stats.published, icon: CheckCheckIcon, trend: "All time" },
    { label: "Connected Accounts", value: stats.connectedAccounts, icon: Share2Icon, trend: "Active" },
  ]
  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div >
        <h2 className="text-2xl  text-slate-800">Good Morning!👋</h2>

        <p className="mt-0.5 text-sm text-slate-500">
          Here's what's happening with your social accounts today.
        </p>
      </div>

      {/* stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STATS_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-slate-800">
                  {card.value}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                  <TrendingUpIcon className="size-3.5" />
                  {card.trend}
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-50">
                <card.icon className="size-4 text-red-500" />
              </div>
            </div>

            {/* Bottom */}
            <p className="mt-5 text-sm font-medium text-slate-500">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="  text-slate-800">
            Recent Activity
          </h3>
          <span className='text-sm text-slate-400'>{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className="py-14 text-center">
            <ActivityIcon className="mx-auto mb-3 size-6 text-slate-300" />

            <p className="text-slate-500 text-sm mb-1">
              No recent activity available.
            </p>
            <p className='text-slate-500 text-xs'>Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {/* Activity List */}

            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-start gap-4 p-4"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                  <SendIcon className="size-4 text-red-500" />
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">
                      Published
                    </span>

                    <span className="text-xs text-slate-400">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard