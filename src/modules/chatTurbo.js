import axios from "axios";

function chatTurbo(system, chat) {
    const config = {
      organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
      apiKey: "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",
      endpoint: "https://api.openai.com/v1/chat/completions",
    };
  
    return new Promise((resolve, reject) => {  
        system = {"role": "system", "content": system}
        // chat.unshift(system)

        axios
          .post(
            config.endpoint,
            {
              model: 'gpt-3.5-turbo',
              messages: [system, ...chat],
              max_tokens: 2000,
              n: 1,
              temperature: 1.1,
            },
            {
              headers: {
                Authorization: `Bearer ${config.apiKey}`,
              },
            }
          )
          .then((res) => {
            resolve(res.data.choices[0].message.content);
          })
          .catch((err) => {
            reject(err);
          })
        })
    }

 export default chatTurbo;   