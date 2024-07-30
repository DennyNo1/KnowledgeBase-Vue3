import apiClient from "@/utils/request_ragflow";
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
      messages: messageArray
    },
  });
}
