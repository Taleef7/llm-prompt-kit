export interface Message {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolId?: string; // Optional toolId for tool messages
}

export interface PromptData {
  [key: string]: any;
}

export class PromptBuilder {
  private messages: Message[];

  constructor() {
    this.messages = [];
    console.log("PromptBuilder initialized (TS Version!)");
  }

  public setSystemMessage(content: string): this {
    // Remove existing system message if any, or decide on strategy
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

  // Basic placeholder interpolation
  private interpolate(content: string, data: PromptData): string {
    let interpolatedContent = content;
    for (const key in data) {
      interpolatedContent = interpolatedContent.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(data[key]));
    }
    return interpolatedContent;
  }

  public build(data?: PromptData): Message[] {
    if (data) {
      return this.messages.map(msg => ({
        ...msg,
        content: this.interpolate(msg.content, data)
      }));
    }
    return [...this.messages]; // Return a copy
  }
}