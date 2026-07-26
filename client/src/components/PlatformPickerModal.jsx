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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl pb-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h3 className="text-lg  text-slate-800">
                            Connect Platform
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Choose a social platform to connect.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <XIcon className="size-5" />
                    </button>
                </div>

                {/* Platform List */}
                <div className="divide-y divide-slate-100">
                    {PLATFORMS.map((platform) => {
                        const isConnected = connectedIds.includes(platform.id);
                        const isConnecting = connecting === platform.id;

                        return (
                            <button
                                key={platform.id}
                                disabled={isConnected || isConnecting}
                                onClick={() => onConnect(platform.id)}
                                className={`flex w-full items-center justify-between px-6 py-4 text-left transition
                  ${isConnected
                                        ? "cursor-not-allowed bg-slate-50"
                                        : "hover:bg-red-50"
                                    }`}
                            >
                                {/* Left */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl
                      ${isConnected
                                                ? "bg-green-100"
                                                : "bg-red-50"
                                            }`}
                                    >
                                        <platform.icon
                                            className={`size-6 ${isConnected
                                                ? "text-green-600"
                                                : "text-red-500"
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <h4 className=" text-slate-800">
                                            {platform.name}
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            {isConnected
                                                ? "Already connected"
                                                : platform.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div>
                                    {isConnecting ? (
                                        <Loader2Icon className="size-5 animate-spin text-red-500" />
                                    ) : isConnected ? (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CheckCheckIcon className="size-5" />
                                            <span className="text-sm ">
                                                Connected
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-sm  text-red-500">
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