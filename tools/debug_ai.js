require('dotenv').config({ path: '.env' });
const { OpenRouter } = require("@openrouter/sdk");

const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

async function testAI() {
    console.log("Testing OpenRouter AI...");
    console.log("API Key present:", !!process.env.OPENROUTER_API_KEY);
    console.log("Model:", process.env.OPENROUTER_MODEL);

    try {
        const completion = await openrouter.chat.send({
            model: process.env.OPENROUTER_MODEL || "stepfun/step-3.5-flash:free",
            messages: [{ role: "user", content: "Say hello" }],
            provider: {
                sort: "throughput",
            },
        });

        console.log("Response:", JSON.stringify(completion, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

testAI();
