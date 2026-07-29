import axios from "axios";
import { Response } from "../services/customResponse.js";
import { GoogleGenAI } from "@google/genai";
import { cloudinary } from "../config/cloudinary.js"
import { Generation } from "../models/generation.model.js"
import { Post } from "../models/post.model.js";


//Generate Post
// POST /api/posts/generate
export const generatePost = async (req, res) => {
    try {
        const { prompt, tone, generateImage } = req.body;

        const apikey = process.env.GEMINI_API_KEY;
        if (!apikey) {
            return Response(res, 400, false, "Gemini API key is missing")
        }

        const ai = new GoogleGenAI({ apikey });

        // Generate Text
        const textResponse = await ai.generateContent({
            model: "gemini-2.5-flash",
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
        if (generateImage) {
            try {
                const hfApiKey = process.env.HUGGING_FACE_API_KEY;
                if (!hfApiKey) {
                    return Response(res, 400, false, "Hugging Face API key is missing");
                }

                // Use Hugging Face open-source model for image generation
                const hfModel = "black-forest-labs/FLUX.1-schnell";

                const hfResponse = await axios.post(
                    `https://api-inference.huggingface.co/models/${hfModel}`,
                    { inputs: imagePrompt },
                    {
                        headers: {
                            Authorization: `Bearer ${hfApiKey}`,
                            "Content-Type": "application/json",
                        },
                        responseType: "arraybuffer",
                    }
                );

                const base64Image = Buffer.from(hfResponse.data).toString("base64");
                const tempUrl = `data:image/png;base64,${base64Image}`;

                // upload to cloudinary for persistence
                const uploadResult = await cloudinary.uploader.upload(tempUrl, {
                    folder: "ai-generations"
                })

                mediaUrl = uploadResult.secure_url;

            } catch (error) {
                console.log("Image generation error:", error.message);
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
        })
    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}


// Schedule Post  
// POST /api/posts/
export const schedulePost = async (req, res) => {
    try {
        const { content, platforms, scheduledFor, status } = req.body;

        // Parse platforms if it come as a stringfied array from FormData
        let parsedPlatforms = platforms;
        if (typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms)
            } catch (e) {
                parsedPlatforms = platforms.split(",")
            }
        }

        let mediaUrl = req.body.mediaUrl;
        let mediaType = req.body.mediaType;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "PostOn"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(req.file.buffer);
            });
            mediaUrl = result.secure_url;
            mediaType = result.resource_type === "video" ? "video" : "image";
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms,
            mediaUrl,
            mediaType,
            scheduledFor,
            status
        })

        return Response(res, 200, true, "Post is Scheduled", post)

    } catch (error) {
        return Response(res, 500, false, error?.message || "Server error")
    }
}