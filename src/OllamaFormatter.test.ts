// src/OllamaFormatter.test.ts
import { describe, it, expect } from 'vitest';
import { OllamaFormatter } from './OllamaFormatter';
import type { Message } from './PromptBuilder'; // Import the Message type

describe('OllamaFormatter', () => {
  it('should instantiate without errors', () => {
    expect(() => new OllamaFormatter()).not.toThrow();
  });

  it('should return an object with an empty messages array when given an empty array', () => {
    const formatter = new OllamaFormatter();
    const messages: Message[] = [];
    const result = formatter.format(messages);
    expect(result).toEqual({ messages: [] });
  });

  it('should return an object with the same messages array that was passed in (single message)', () => {
    const formatter = new OllamaFormatter();
    const messages: Message[] = [{ role: 'user', content: 'Hello, Ollama!' }];
    const result = formatter.format(messages);
    // We expect the 'messages' property in the result to be the same array instance,
    // or at least deeply equal. Given the current implementation, it's the same instance.
    expect(result).toEqual({ messages: messages });
    // Optionally, to be very specific about the instance if that's a contract:
    // expect(result.messages).toBe(messages);
  });

  it('should return an object with the same messages array that was passed in (multiple messages)', () => {
    const formatter = new OllamaFormatter();
    const messages: Message[] = [
      { role: 'system', content: 'You are an assistant.' },
      { role: 'user', content: 'Tell me a joke.' },
      { role: 'assistant', content: 'Why did the chicken cross the road?' },
    ];
    const result = formatter.format(messages);
    expect(result).toEqual({ messages: messages });
  });

  it('should return an object that only contains the messages key by default', () => {
    const formatter = new OllamaFormatter();
    const messages: Message[] = [{ role: 'user', content: 'Test message' }];
    const result = formatter.format(messages);
    expect(Object.keys(result)).toEqual(['messages']);
    expect(result.model).toBeUndefined();
    expect(result.stream).toBeUndefined();
  });
});
