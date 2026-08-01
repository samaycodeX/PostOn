import axios from "axios";
import { Response } from "../services/customResponse.js";
import { GoogleGenAI } from "@google/genai";
import { cloudinary } from "../config/cloudinary.js"
import { Generation } from "../models/generation.model.js"
import { Post } from "../models/post.model.js";
import getDataUri from "../services/dataUri.js";


//Generate Post
// POST /api/posts/generate
export const generatePost = async (req, res) => {
    try {
        const { prompt, tone, generateImage } = req.body;

        if (!prompt?.trim()) {
            return Response(res, 400, false, "Prompt is required");
        }

        const apikey = process.env.GEMINI_API_KEY;
        if (!apikey) {
            return Response(res, 400, false, "Gemini API key is missing")
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        // Generate Text
        const textResponse = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: `Generate a socil media post based on this prompt : "${prompt}".
             Tone : ${tone}.
             Include relevent hastags.
             Formate the response as JSON with "content" and "imagePrompt" fields.
             The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`,
        });

        let content = "";
        let imagePrompt = prompt;

        try {
            const rawText = textResponse.text || "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/)
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { content: rawText, imagePrompt: prompt };
            content = data.content;
            imagePrompt = data.imagePrompt;

        } catch (error) {
            content = textResponse.text || "";
        }

        let mediaUrl = "";
        // if (generateImage) {
        //     try {
        //         const hfApiKey = process.env.HUGGING_FACE_API_KEY;
        //         if (!hfApiKey) {
        //             return Response(res, 400, false, "Hugging Face API key is missing");
        //         }

        //         // Use Hugging Face open-source model for image generation
        //         const hfModel = "black-forest-labs/FLUX.1-schnell";

        //         const hfResponse = await axios.post(
        //             `https://api-inference.huggingface.co/models/${hfModel}`,
        //             { inputs: imagePrompt },
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${hfApiKey}`,
        //                     "Content-Type": "application/json",
        //                 },
        //                 responseType: "arraybuffer",
        //             }
        //         );

        //         const base64Image = Buffer.from(hfResponse.data).toString("base64");
        //         const tempUrl = `data:image/png;base64,${base64Image}`;

        //         // upload to cloudinary for persistence
        //         const uploadResult = await cloudinary.uploader.upload(tempUrl, {
        //             folder: "ai-generations"
        //         })

        //         mediaUrl = uploadResult.secure_url;

        //     } catch (error) {
        //         console.log("Image generation error:", error.message);
        //     }
        // }

        if (generateImage) {
            try {
                const encodedPrompt = encodeURIComponent(imagePrompt);
                const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

                const imgResponse = await axios.get(pollinationsUrl, {
                    responseType: "arraybuffer",
                });

                const base64Image = Buffer.from(imgResponse.data).toString("base64");
                const tempUrl = `data:image/png;base64,${base64Image}`;

                const uploadResult = await cloudinary.uploader.upload(tempUrl, {
                    folder: "ai-generations",
                });

                mediaUrl = uploadResult.secure_url;
            } catch (error) {
                console.log("Image generation error:", error.message);
                // don't fail the whole request — text content already generated successfully
            }
        }

        // Save generation to DB
        const generation = await Generation.create({
            user: req.user._id,
            prompt,
            content,
            mediaUrl,
            mediaType: mediaUrl ? "image" : undefined,
            tone
        })

        return Response(res, 201, true, "Content is generated", generation)

    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}

// Get Generation   
// GET /api/posts/generations
export const getGenerations = async (req, res) => {
    try {
        const generations = await Generation.find({ user: req.user._id, }).sort({ createdAt: -1 });
        return Response(res, 200, true, "All Generations", generations)
    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}

// Get Post   
// GET /api/posts/
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        })
        return Response(
            res,
            200,
            true,
            "Posts fetched",
            posts
        );
    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}


// Schedule Post  
// POST /api/posts/
export const schedulePost = async (req, res) => {
    try {
        const {
            content,
            platforms,
            scheduledFor,
            mediaUrl: existingMediaUrl,
            mediaType: existingMediaType,
        } = req.body;


        if (!content) {
            return Response(res, 400, false, "Content is required");
        }

        if (!platforms) {
            return Response(res, 400, false, "Select at least one platform");
        }

        if (!scheduledFor) {
            return Response(res, 400, false, "Schedule date is required");
        }

        if (Number.isNaN(new Date(scheduledFor).getTime())) {
            return Response(res, 400, false, "Schedule date is invalid");
        }

        // Parse platforms if it come as a stringfied array from FormData
        let parsedPlatforms = platforms;


        if (typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms)
            } catch (e) {
                parsedPlatforms = platforms.split(",")
            }
        }



        if (!Array.isArray(parsedPlatforms) || parsedPlatforms.length === 0) {
            return Response(res, 400, false, "Select at least one platform");
        }

        let mediaUrl = existingMediaUrl || "";
        let mediaType = existingMediaType || "";


        if (req.files?.media?.length > 0) {
            const file = req.files.media[0];

            const fileUri = getDataUri(file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    folder: "PostOn",
                    resource_type: "auto",
                    transformation: [
                        {
                            width: 1080,
                            height: 1080,
                            crop: "fill",
                        },
                    ],
                }
            );

            mediaUrl = cloudResponse.secure_url;
            mediaType =
                cloudResponse.resource_type === "video"
                    ? "video"
                    : "image";
        }
        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms,
            mediaUrl,
            mediaType,
            scheduledFor,
            status: "scheduled"
        })



        return Response(res, 200, true, "Post is Scheduled", post)

    } catch (error) {
        // console.error("Failed to schedule post:", error);
        // console.error("schedulePost error:", error);
        return Response(res, 500, false, error?.message || "Server error")
    }
}
