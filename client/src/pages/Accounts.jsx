import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import api from "../api/api";
import { PLATFORMS } from "../assets/assets";
import AccountList from "../components/AccountList";
import PlatformPickerModal from "../components/PlatformPickerModal";
import {
  setAccounts,
  setConnecting,
  setError,
  setLoading,
} from "../redux/features/accountSlice";

const Accounts = () => {
  const dispatch = useDispatch();

  const { accounts, connecting } = useSelector(
    (store) => store.account
  );

  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync = false,
    platform = null,
    successMsg = "Accounts synced successfully"
  ) => {
    dispatch(setLoading(true));

    try {
      if (isSync) {
        const label = platform
          ? platform.charAt(0).toUpperCase() + platform.slice(1)
          : "Social Media";

        toast.loading(`Syncing ${label}...`, {
          id: "sync",
        });

        await api.get("/api/oauth/sync");
      }

      const { data } = await api.get("/api/accounts");
      console.log(data.length);
      

      dispatch(setAccounts(data.data));

      if (isSync) {
        toast.success(successMsg, {
          id: "sync",
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to load accounts";

      dispatch(setError(message));

      if (isSync) {
        toast.error(message, {
          id: "sync",
        });
      } else {
        toast.error(message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const connectedPlatform = params.get("connected");
    const connectedUsername = params.get("username");
    const syncNeeded = params.get("sync") === "true";
    const errorMsg = params.get("error");

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

    if (connectedPlatform) {
      const label =
        connectedPlatform.charAt(0).toUpperCase() +
        connectedPlatform.slice(1);

      const handle = connectedUsername
        ? ` (@${connectedUsername})`
        : "";

      fetchAccounts(
        true,
        connectedPlatform,
        `${label}${handle} connected successfully`
      );
    } else if (syncNeeded) {
      fetchAccounts(true);
    } else if (errorMsg) {
      toast.error(decodeURIComponent(errorMsg));
      fetchAccounts();
    } else {
      fetchAccounts();
    }
  }, []);

  const handleConnect = async (platformId) => {
    dispatch(setConnecting(platformId));

    try {
      const { data } = await api.get(
        `/api/oauth/${platformId}/url`
      );

      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to connect account"
      );

      dispatch(setConnecting(null));
    }
  };

  const handleDisconnect = async (accountId) => {
    try {
      await api.delete(`/api/accounts/${accountId}`);

      toast.success("Account disconnected");

      await fetchAccounts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to disconnect account"
      );
    }
  };

  const connectedIds = accounts.map(
    (account) => account.platform
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl text-slate-800">
            Connected Accounts
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>

        <button
          onClick={() => setShowPlatformPicker(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
        >
          <PlusIcon className="size-4" />
          Connect Account
        </button>
      </div>

      {showPlatformPicker && (
        <PlatformPickerModal
          connectedIds={connectedIds}
          connecting={connecting}
          onClose={() => setShowPlatformPicker(false)}
          onConnect={handleConnect}
        />
      )}

      <AccountList
        accounts={accounts}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
};

export default Accounts;