import OpenAI from "openai";

let openai;

function getOpenAI() {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    });
  }
  return openai;
}

export const generateReply = async (
  docs,
  history,
  question
) => {

  if (!docs.length) {
    return {
      reply:
        "Sorry, I don’t have information about that.",
      tokensUsed: 0
    };
  }

  const docContext =
    docs.map(d =>
      `${d.title}: ${d.content}`
    ).join("\n");

  const historyText =
    history.map(m =>
      `${m.role}: ${m.content}`
    ).join("\n");

  const prompt = `
You are a support assistant.

STRICT RULES:
Answer ONLY using provided documentation.

Documentation:
${docContext}

Conversation:
${historyText}

User Question:
${question}
`;

  const client = getOpenAI();

  try {
    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "user", content: prompt }
        ]
      });

    return {
      reply:
        completion.choices[0]
          .message.content.trim(),
      tokensUsed:
        completion.usage?.total_tokens || 0
    };

  } catch (err) {
    console.error("Groq error:", err.message);

    return {
      reply:
        "Sorry, I don’t have information about that.",
      tokensUsed: 0
    };
  }
};