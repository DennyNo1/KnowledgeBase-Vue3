import apiClient from "@/utils/request_ragflow";
import request from "@/utils/request";
export async function userCreateConversation() {
  return await apiClient({
    method: "GET",
    url: "/api/new_conversation",
  });
}

export async function userSendMessage(conversationId, messageArray) {
  return await apiClient({
    method: "POST",
    url: "/api/completion",
    data: {
      conversation_id: conversationId,
      messages: messageArray,
    },
  });
}

export const userDissatisfiedAnswerService = (question, answer, reference) =>
  request.post("/chat/collect", { question, answer, reference });
