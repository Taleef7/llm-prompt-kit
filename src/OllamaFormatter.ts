import { Message } from './PromptBuilder'; // Assuming Message interface is in PromptBuilder.ts

export class OllamaFormatter {
  constructor() {
    console.log("OllamaFormatter initialized (TS Version!)");
  }

  // This is a guess for a common Ollama API structure.
  // You'll need to verify against the specific Ollama API endpoint you target.
  // It often expects a 'messages' array for chat models.
  public format(messages: Message[]): { model?: string, messages: Message[], stream?: boolean } {
    // Example: simply return the messages array, ready to be part of a larger request body
    // You might add model name or stream preferences here if needed by the API
    return { messages };
  }
}