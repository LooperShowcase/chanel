let open_ai_response;

let converstion = [
  { role: "user", content: "hi" },
  { role: "assistant", content: "hey... how r u ?" },
];
async function conversationUserAdd(question, sentiment) {
  converstion.push({
    role: "user",
    content:
      "my happiness out of 10:" + sentiment + "my question is :" + question,
  });
}
async function conversationAssistantAdd(response) {
  converstion.push({ role: "assistant", content: response });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";


  let apikey1 = "sk";
  let apikey2 = "-BFXn6S1AlIDqGCX7xe3YT";
  let apikey3 = "3BlbkFJbnCYChkNgKO6BHhVvfx2";
  let apikey = apikey1 + apikey2 + apikey3;
  let data = { model: "gpt-3.5-turbo", messages: converstion };

  let response;
  try {
     response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;
      conversationAssistantAdd(message);
      console.log(message);
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("request failed with status:", resonse.status);
    }
  } catch (error) {
    console.log("there is an error", error);
  }
}
