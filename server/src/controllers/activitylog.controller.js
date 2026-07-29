
import { ActivityLog } from "../models/activitylog.model.js"
import { Response } from "../services/customResponse.js";


// Get all activity

// GET /api/activity
export const getActivity = async (req, res) => {
    try {
        const activity = await ActivityLog.find({
            user: req.user._id
        }).sort({ createdAt: -1 }).limit(10).populate("relatedPost", "content")

        return Response(res, 200, true, "All Activity is getted", activity);
    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}