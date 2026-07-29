import zernio from "../config/zernio.js"
import { Account } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import { Response } from "../services/customResponse.js";

// Helper to ensure user has a Zernio Profile
const getOrCreateZernioProfile = async (user) => {
    if (user.zernioProfileId) return user.zernioProfileId;

    const createResult = await zernio.profiles.createProfile({
        body: { name: `${user.name || user.email}'s workspace` },
    });

    const profile = createResult.data?.profile;
    const pid = profile?._id || profile?.id;

    if (!pid) throw new Error("Zernio did not return a profile ID");

    await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
    return pid;
};

// Genreate Oauth authorization Url
// GET /api/auth/:platform
export const generateAuthUrl = async (req, res) => {
    try {
        const { platform } = req.params;

        const profileId = await getOrCreateZernioProfile(req.user)

        const origin = req.headers.origin
        const redirectUrl = `${origin}/accounts`;

        const result = await zernio.connect.getConnectUrl({
            path: { platform },
            query: {
                profileId,
                redirect_url: redirectUrl,
            },
        });

        const data = result.data;
        console.log("getConnectUrl response : ", JSON.stringify(data, null, 2));

        const authUrl = data.authUrl;

        if (!authUrl) {
            throw new Error(`Zernio returned no authUrl. Full response : ${JSON.stringify(data, null, 2)}`)
        }

        res.json({ url: result.data.authUrl });


    } catch (error) {
        return Response(res, 500, false, error?.message || "Server Error")
    }
}

// Sync connected accounts from Zernio into mongodb
// GET /api/auth/sync
export const syncAccounts = async (req, res) => {
    try {
        const profileId = await getOrCreateZernioProfile(req.user)

        const result = await zernio.accounts.listAccounts({
            query: { profileId }
        })

        const data = result.data;
        const zernioAccounts = data?.accounts || (Array.isArray(data) ? data : []);

        const supportedPlatform = ["twitter", "linkedin", "facebook", "instagram"];
        const syncedAccounts = [];

        for (const zAccount of zernioAccounts) {
            const zid = zAccount._id || zAccount.id;
            if (!zid) {
                console.warn("Skipping  account with no ID : ", zAccount);
                continue;
            }
            const rawPlatform = (zAccount.platform || zAccount.type || "").toLowerCase();

            const normalizedPlatform = supportedPlatform.find((p) => rawPlatform.includes(p));

            if (!normalizedPlatform) {
                console.log(`Skipping unsupported platform : ${rawPlatform}`);
                continue;
            }

            const account = await Account.findOneAndUpdate({ zernioAccountId: zid },
                {
                    user: req.user._id,
                    platform: normalizedPlatform,
                    status: "connected",
                    handle: zAccount.username || zAccount.displayName || "Unknown",
                    avatarUrl: zAccount.profilePicture,
                },
                { upsert: true, returnDocument: 'after' }
            )
            syncedAccounts.push(account)
        }
        res.json(syncedAccounts)

    } catch (error) {
        return Response(res, 500, false, error?.message || "Server Error")
    }
}