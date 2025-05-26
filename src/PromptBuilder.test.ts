// src/PromptBuilder.test.ts
import { describe, it, expect } from 'vitest'; // Vitest globals
import { PromptBuilder, type Message } from './PromptBuilder'; // Import your class

describe('PromptBuilder', () => {
  it('should initialize with an empty messages array', () => {
    const builder = new PromptBuilder();
    expect(builder.build()).toEqual([]);
  });

  it('should add a user message correctly', () => {
    const builder = new PromptBuilder();
    builder.addUserMessage('Hello, user!');
    const expectedMessages: Message[] = [
      { role: 'user', content: 'Hello, user!' },
    ];
    expect(builder.build()).toEqual(expectedMessages);
  });

  it('should add a system message correctly', () => {
    const builder = new PromptBuilder();
    builder.setSystemMessage('System initializing...');
    const expectedMessages: Message[] = [
      { role: 'system', content: 'System initializing...' },
    ];
    expect(builder.build()).toEqual(expectedMessages);
  });

  it('should interpolate data when build is called with data', () => {
    const builder = new PromptBuilder();
    builder.addUserMessage('Hello, {{name}}!');
    const messages = builder.build({ name: 'World' });
    expect(messages[0].content).toBe('Hello, World!');
  });

  it('should handle addContextBlock with a single string', () => {
    const builder = new PromptBuilder();
    builder.addContextBlock('This is some context.');
    const messages = builder.build();
    expect(messages).toContainEqual({ // Use toContainEqual for checking an element in an array
      role: 'context',
      content: 'This is some context.',
    });
  });

  it('should handle addContextBlock with an array of strings', () => {
    const builder = new PromptBuilder();
    builder.addContextBlock(['First context.', 'Second context.']);
    const messages = builder.build();
    expect(messages).toContainEqual({ // Use toContainEqual
      role: 'context',
      content: 'First context.\n---\nSecond context.',
    });
  });

  it('should add an assistant message correctly', () => { // New Test
    const builder = new PromptBuilder();
    builder.addAssistantMessage('I am here to help.');
    const expectedMessages: Message[] = [
      { role: 'assistant', content: 'I am here to help.' },
    ];
    expect(builder.build()).toEqual(expectedMessages);
  });

  it('should add a tool message correctly', () => { // New Test
    const builder = new PromptBuilder();
    builder.addToolMessage('tool_123', 'Tool output content.');
    const expectedMessages: Message[] = [
      { role: 'tool', toolId: 'tool_123', content: 'Tool output content.' },
    ];
    expect(builder.build()).toEqual(expectedMessages);
  });
});