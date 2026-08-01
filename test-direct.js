import { HfInference } from '@huggingface/inference';
import fs from 'fs'; // Node.js ka built-in File System module image save karne ke liye
import dotenv from 'dotenv';

// 1. Load environment variables (.env file se token uthane ke liye)
dotenv.config();

// Check if token exists
if (!process.env.HF_TOKEN) {
    console.error("❌ ERROR: Aapka HF_TOKEN .env file me nahi mila!");
    process.exit(1);
}

// 2. Initialize connection client
const hf = new HfInference(process.env.HF_TOKEN);

async function checkModelWorking() {
    console.log("⏳ Hugging Face API se connect ho raha hai...");
    console.log("🤖 Model: black-forest-labs/FLUX.1-schnell ko test kar rahe hain...");

    try {
        // 3. Directly model ko call karein (Bina kisi Express route ke)
        const responseBlob = await hf.textToImage({
            model: 'black-forest-labs/FLUX.1-schnell',
            inputs: "A neon glowing checkmark icon, high quality digital art",
        });

        console.log("📥 Raw data safely receive ho gaya hai.");

        // 4. Data ko array buffer aur buffer me convert karein
        const arrayBuffer = await responseBlob.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        // 5. Node.js ke 'fs' module se image ko directly folder me save karein
        const outputFilename = 'direct_test_success.png';
        fs.writeFileSync(outputFilename, imageBuffer);

        console.log(`\n=========================================`);
        console.log(`✅ SUCCESS: Model perfectly kaam kar raha hai!`);
        console.log(`📁 Image save ho gayi hai: "${outputFilename}"`);
        console.log(`=========================================`);

    } catch (error) {
        console.log(`\n=========================================`);
        console.log(`❌ TEST FAILED: Model me error aaya hai.`);
        console.log(`Detail Error: ${error.message}`);
        
        if (error.message.includes("loading")) {
            console.log(`💡 HINT: Model abhi load ho raha hai cloud par. 1-2 minute baad is file ko firse run karein.`);
        } else if (error.message.includes("401") || error.message.includes("Authorization")) {
            console.log(`💡 HINT: Aapka Hugging Face token galat hai ya usme READ permission nahi hai.`);
        }
        console.log(`=========================================`);
    }
}

// Function ko execute karein
checkModelWorking();
