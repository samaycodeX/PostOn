import {
    CheckCheckIcon,
    Loader2Icon,
    XIcon,
} from "lucide-react";
import { PLATFORMS } from "../assets/assets";

const PlatformPickerModal = ({
    connectedIds,
    connecting,
    onClose,
    onConnect,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102E46]/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl pb-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E8F1F5] px-6 py-4">
                    <div>
                        <h3 className="text-lg text-[#102E46]">
                            Connect Platform
                        </h3>

                        <p className="mt-1 text-sm text-[#5F6B78]">
                            Choose a social platform to connect.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-[#5F6B78] transition hover:bg-[#EAF8FD] hover:text-[#102E46]"
                    >
                        <XIcon className="size-5" />
                    </button>
                </div>

                {/* Platform List */}
                <div className="divide-y divide-[#E8F1F5]">
                    {PLATFORMS.map((platform) => {
                        const isConnected = connectedIds.includes(platform.id);
                        const isConnecting = connecting === platform.id;

                        return (
                            <button
                                key={platform.id}
                                disabled={isConnected || isConnecting}
                                onClick={() => onConnect(platform.id)}
                                className={`flex w-full items-center justify-between px-6 py-4 text-left transition ${isConnected
                                        ? "cursor-not-allowed bg-[#F8FCFE]"
                                        : "hover:bg-[#F1F8FC]"
                                    }`}
                            >
                                {/* Left */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${isConnected
                                                ? "bg-green-100"
                                                : "bg-[#EAF8FD]"
                                            }`}
                                    >
                                        <platform.icon
                                            className={`size-6 ${isConnected
                                                    ? "text-green-600"
                                                    : "text-[#78C6E3]"
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-[#102E46]">
                                            {platform.name}
                                        </h4>

                                        <p className="text-sm text-[#5F6B78]">
                                            {isConnected
                                                ? "Already connected"
                                                : platform.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div>
                                    {isConnecting ? (
                                        <Loader2Icon className="size-5 animate-spin text-[#78C6E3]" />
                                    ) : isConnected ? (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCheckIcon className="size-5" />
                                            <span className="text-sm">
                                                Connected
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-[#102E46]">
                                            Connect
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlatformPickerModal;