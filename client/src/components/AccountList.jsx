import { AlertCircleIcon, CheckCircleIcon, PlusIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../assets/assets";

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
            <div className="rounded-xl border border-[#E8F1F5] bg-white p-10 shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF8FD]">
                    <PlusIcon className="size-6 text-[#78C6E3]" />
                </div>

                <h3 className="mt-4 text-center text-lg font-semibold text-[#102E46]">
                    No accounts connected
                </h3>

                <p className="mx-auto mt-2 max-w-md text-center text-sm text-[#5F6B78]">
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
                        className="flex items-center justify-between rounded-xl border border-[#E8F1F5] bg-white p-4 shadow-sm transition hover:shadow-md hover:border-[#CFEAF5]"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF8FD]">
                                <meta.icon className="size-6 text-[#78C6E3]" />
                            </div>

                            <div>
                                <h3 className="text-[#102E46]">
                                    {acc.handle}
                                </h3>

                                <p className="text-sm text-[#5F6B78]">
                                    {meta.name}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            {acc.status === "connected" ? (
                                <>
                                    <CheckCircleIcon className="size-5 text-[#22C55E]" />
                                    <span className="text-sm text-[#22C55E]">
                                        Connected
                                    </span>
                                </>
                            ) : (
                                <>
                                    <AlertCircleIcon className="size-5 text-[#F59E0B]" />
                                    <span className="text-sm text-[#F59E0B]">
                                        Disconnected
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Disconnect Button */}
                        <button
                            onClick={() => handleDisconnect(acc._id)}
                            title="Disconnect Account"
                            className="rounded-lg p-2 text-[#5F6B78] transition hover:bg-[#EAF8FD] hover:text-[#102E46]"
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