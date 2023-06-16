// https://platform.openai.com/docs/api-reference/images/create-edit
const OPEN_API_KEY = "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";
const OPEN_API_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const OPEN_API_MODEL_VERSION = "gpt-3.5-turbo";

export async function requestChatGpt(message: string) {
  try {
    const body = {
        model: OPEN_API_MODEL_VERSION,
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      };
    
      let response;
      await fetch(OPEN_API_CHAT_URL, {
        headers: {
          Authorization: `Bearer ${OPEN_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }).then((data) =>  {
        response = data;
        console.log('Sucesso ao enviar mensagem para o chat GPT', response);
      });
      return response;
  } catch {
    console.error('Erro ao enviar mensagem para o chat GPT');
  }  
}