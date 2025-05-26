# @taleef/llm-prompt-kit

[![Node.js CI](https://github.com/Taleef7/llm-prompt-kit/actions/workflows/node-ci.yml/badge.svg)](https://github.com/Taleef7/llm-prompt-kit/actions/workflows/node-ci.yml)

A flexible and powerful toolkit for building, managing, and formatting prompts for Large Language Models (LLMs) in TypeScript/JavaScript projects.

## The Problem

Crafting and managing prompts for LLMs, especially as they grow in complexity for tasks like Retrieval Augmented Generation (RAG) or specific instruction-following, can become cumbersome and error-prone. This toolkit aims to simplify this process by providing structured builders and formatters.

## Core Features

- **Fluent PromptBuilder API:** Construct complex prompt sequences with system messages, user messages, assistant responses, context blocks, and tool interactions.
- **Placeholder Support:** Easily define templates with placeholders and inject data at build time.
- **Model-Specific Formatters:** Ensure your prompts are correctly structured for target LLMs (starting with Ollama).
- **TypeScript First:** Written in TypeScript for strong typing and excellent developer experience.

## Installation

```bash
npm install @taleef/llm-prompt-kit
# or
# yarn add @taleef/llm-prompt-kit
```

## Usage

Here's how to get started with PromptBuilder and OllamaFormatter:

### Building a Prompt

```typescript
import { PromptBuilder } from "@taleef/llm-prompt-kit";

const builder = new PromptBuilder();

builder
  .setSystemMessage(
    "You are a helpful assistant that translates text to French.",
  )
  .addContextBlock("Context: The user is planning a trip to Paris.")
  .addUserMessage("Translate the following sentence: '{{englishSentence}}'");

const promptMessages = builder.build({
  englishSentence: "Hello, how are you?",
});

console.log(JSON.stringify(promptMessages, null, 2));
/*
Output:
[
  {
    "role": "system",
    "content": "You are a helpful assistant that translates text to French."
  },
  {
    "role": "context",
    "content": "Context: The user is planning a trip to Paris."
  },
  {
    "role": "user",
    "content": "Translate the following sentence: 'Hello, how are you?'"
  }
]
*/
```

### Formatting for Ollama

```typescript
import {
  PromptBuilder,
  OllamaFormatter,
  Message,
} from "@taleef/llm-prompt-kit";

// Assuming 'promptMessages' from the example above
const promptMessages: Message[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello!" },
];

const ollamaFormatter = new OllamaFormatter();
const ollamaPayload = ollamaFormatter.format(promptMessages);

console.log(JSON.stringify(ollamaPayload, null, 2));
/*
Output (example, actual Ollama format might vary slightly based on endpoint):
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}

// This payload can then be sent to an Ollama API endpoint.
// e.g., for a chat completions API:
// {
//   "model": "llama3", // specify your model
//   "messages": ollamaPayload.messages,
//   "stream": false
// }
*/
```

## API Overview

#### <code>PromptBuilder</code>:

A class to fluently construct a sequence of messages for an LLM prompt.

- <code>constructor()</code>
- <code>setSystemMessage(content: string): this</code>
- <code>addUserMessage(content: string): this</code>
- <code>addAssistantMessage(content: string): this</code>
- <code>addToolMessage(toolId: string, content: string): this</code>
- <code>addContextBlock(context: string | string[]): this</code>
- <code>build(data?: PromptData): Message[]</code>

#### <code>OllamaFormatter</code>:

A class to format the message array from PromptBuilder into a structure suitable for Ollama API endpoints.

- <code>constructor()</code>
- <code>format(messages: Message[]): OllamaPayload</code> (Define OllamaPayload or refer to its structure)

#### <code>Message</code> Interface

```typescript
interface Message {
  role: "system" | "user" | "assistant" | "tool" | "context";
  content: string;
  toolId?: string;
}
```

#### <code>PromptData</code> Interface

```typescript
interface PromptData {
  [key: string]: string | number | boolean | undefined | null;
}
```

## Contributing

Contributions are welcome! Please open an issue to discuss a new feature or bug, or submit a pull request.

## License

This project is licensed under the [MIT](https://opensource.org/license/mit) License.