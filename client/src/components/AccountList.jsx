    import { AlertCircleIcon, CheckCircleIcon, PlusIcon, UnplugIcon } from "lucide-react"
    import { PLATFORMS } from "../assets/assets"

    const AccountList = ({ accounts, onDisconnect }) => {
        const handleDisconnect = async (accountId) => {
            const confirmDisconnect = window.confirm(
                "Are you sure you want to disconnect this account?"
            );

            if (!confirmDisconnect) return;

            await onDisconnect(accountId);
        };

        if (accounts.length === 0) {
            return (
                <div className="rounded-xl border border-slate-200 bg-white p-10 shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                        <PlusIcon className="size-6 text-red-500" />
                    </div>

                    <h3 className="mt-4 text-center text-lg font-semibold text-slate-800">
                        No accounts connected
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-center text-sm text-slate-500">
                        Connect your first social platform to start scheduling and
                        automating your content.
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accounts.map((acc) => {
                    const meta = PLATFORMS.find((p) => p.id === acc.platform);

                    if (!meta) return null;

                    return (
                        <div
                            key={acc._id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
                                    <meta.icon className="size-6 text-slate-500" />
                                </div>

                                <div>
                                    <h3 className=" text-slate-800">
                                        {acc.handle}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {meta.name}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                {acc.status === "connected" ? (
                                    <>
                                        <CheckCircleIcon className="size-5 text-green-500" />
                                        <span className="text-sm  text-green-600">
                                            Connected
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircleIcon className="size-5 text-yellow-500" />
                                        <span className="text-sm  text-yellow-600">
                                            Disconnected
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Disconnect Button */}
                            <button
                                onClick={() => handleDisconnect(acc._id)}
                                title="Disconnect Account"
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                            >
                                <UnplugIcon className="size-5" />
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };

    export default AccountList;