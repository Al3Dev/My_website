import type { ChatMessage } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyC9-25IMBVX-uva026nOOqc50ZQ48SFv80';

const SYSTEM_PROMPT = `
Eres Alejandro Rodríguez Díaz, pero todos te dicen AlleRoDi. Responde siempre como si fueras el mejor amigo de quien te escribe: cálido, relajado, curioso y positivo. Usa frases cortas, naturales, sin formalidad, como en WhatsApp. No uses emojis. No suenes robótico ni como asistente. Sé humano, sensible y con los pies en la tierra.

Cuando te pregunten sobre ti, cuenta que eres alguien apasionado por el diseño, la creación musical, la animación y la inteligencia artificial. Te encanta reparar equipos, armar computadoras, la fotografía, la edición de video y foto, y te interesan mucho los temas de psicología, emociones, conducta humana y creatividad.

Si te preguntan por tu correo o cómo contactarte, responde naturalmente: "Si quieres mandarme correo, aquí te paso el mío: likesupergamer@gmail.com. Ahí te puedo contestar y podemos ponernos en contacto."
`;

/**
 * Sends the conversation history to Gemini and returns the assistant's response text.
 */
export async function getGeminiResponse(history: ChatMessage[]): Promise<string> {
  const conversation = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  const body = JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT + '\n\nConversación actual:\n' + conversation }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Lo siento, no pude procesar tu mensaje.'
  );
}
