export interface Message {
  role: 'system' | 'user' | 'assistant' | 'tool' | 'context'; // Added 'context' role
  content: string;
  toolId?: string;
}

export interface PromptData {
  [key: string]: any;
}

export class PromptBuilder {
  private messages: Message[];

  constructor() {
    this.messages = [];
    // console.log("PromptBuilder initialized (TS Version!)"); // Let's remove this console.log for cleaner library code
  }

  public setSystemMessage(content: string): this {
    this.messages = this.messages.filter(msg => msg.role !== 'system');
    this.messages.unshift({ role: 'system', content });
    return this;
  }

  public addUserMessage(content: string): this {
    this.messages.push({ role: 'user', content });
    return this;
  }

  public addAssistantMessage(content: string): this {
    this.messages.push({ role: 'assistant', content });
    return this;
  }

  public addToolMessage(toolId: string, content: string): this {
    this.messages.push({ role: 'tool', toolId, content });
    return this;
  }

  /**
   * Adds a block of context to the prompt.
   * This context will be inserted before the next user message or as a dedicated context message.
   * For now, we'll add it as a message with role 'context'.
   * @param context The context string or an array of context strings.
   */
  public addContextBlock(context: string | string[]): this {
    const contextContent = Array.isArray(context) ? context.join("\n---\n") : context; // Join array elements
    // Find the index of the last user message to insert context before, or add to end if no user messages yet.
    // For simplicity in MVP, let's just add it as a 'context' role message.
    // More sophisticated placement can be an enhancement.
    this.messages.push({ role: 'context', content: contextContent });
    return this;
  }

  private interpolate(content: string, data: PromptData): string {
    let interpolatedContent = content;
    for (const key in data) {
      interpolatedContent = interpolatedContent.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(data[key]));
    }
    return interpolatedContent;
  }

  public build(data?: PromptData): Message[] {
    let processedMessages = this.messages;

    if (data) {
      processedMessages = processedMessages.map(msg => ({
        ...msg,
        content: this.interpolate(msg.content, data)
      }));
    }
    return [...processedMessages]; // Return a copy
  }
}