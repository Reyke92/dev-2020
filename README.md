# WKU Information Chatbot

A lightweight web-based chatbot built to help Western Kentucky University students quickly find answers to common questions and be directed to WKU services and information pages.

This project uses a simple keyword and term-ranking approach rather than a machine learning model. User messages are matched against curated topics and resources defined in a JSON configuration file, allowing the chatbot to respond with either direct guidance or a link to the most relevant WKU page.

## Overview

The WKU Information Chatbot is a static front-end chatbot application written primarily in TypeScript and SCSS. It presents students with a topic-driven chat interface and attempts to interpret user questions by comparing the words and phrases in a message against predefined keywords stored in a configuration file.

The design is intentionally straightforward:

- **Topics** organize the chatbot's knowledge into categories.
- **Resources** represent specific answers, explanations, or external WKU links.
- **Keywords** and **weighted keywords** help determine which resource best matches a student's message.
- **UI logic** handles the chat window, buttons, message rendering, and topic switching.

This makes the chatbot easy to maintain and extend: most new supported questions can be added by editing the configuration rather than rewriting application logic.

## Purpose

The goal of this project is to help WKU students receive prompt answers to frequently asked questions and guide them toward the services and information resources provided by WKU.

Rather than attempting to answer every possible question, the chatbot focuses on a controlled set of supported topics and routes students toward official university pages when appropriate.

## Key Features

- Topic-based conversation flow
- Keyword and weighted-keyword matching
- JSON-driven knowledge base
- Direct text responses and link-based responses
- Built-in feedback loop after each answer
- Helpful fallback and apology messages when no confident match is found
- Simple web UI for chatting and changing topics
- Easily expandable content through configuration updates

## How It Works

### 1. Topic selection

When the application starts, the user is prompted to choose a topic. The chatbot then limits its resource search to the selected topic.

### 2. Message cleanup and parsing

The user's message is cleaned before processing. The chatbot removes some punctuation, normalizes spacing, replaces dashes with spaces, and tokenizes the message into searchable terms.

### 3. Keyword scoring

Each resource inside the current topic is scored against the user's message.

The scoring system supports:

- single-word keyword matches
- phrase matches
- simple "or" style keyword patterns such as `word1/word2`
- weighted keywords for more important terms

The chatbot calculates a normalized score for each resource and selects the highest-scoring result.

### 4. Confidence checks

A resource is only returned when the match is strong enough to be useful. If the best score is too low or tied with another top result, the chatbot declines to guess and instead gives a fallback response.

### 5. Response delivery

If the chosen resource contains only a URL, the chatbot displays it as a link. If the resource contains explanatory text, it displays that text directly in the chat.

### 6. Feedback loop

After each answer, the chatbot asks whether the response was helpful. If the user says no, the chatbot falls back to its recovery flow and encourages another attempt.

## Supported Topic Areas

Based on the current configuration, the chatbot includes content in areas such as:

- Dining
- Housing
- Academics
- Financial Aid
- WKU Online

These topics include resources for common student questions such as meal plans, housing applications, private rooms, academic catalogs, majors and minors, financial aid, online classes, and registration guidance.

## Project Structure

```text
.
|-- dist/                  # Prebuilt deployment output
|-- scss/
|   `-- style.scss         # Application styles
|-- ts/
|   |-- config/
|   |   |-- Config.ts      # Config type definition
|   |   `-- config.json    # Main chatbot knowledge base
|   |-- Chatbot.ts         # Core chatbot logic and scoring
|   |-- HashMap.ts         # Simple custom hashmap used during parsing/scoring
|   |-- MessageType.ts     # Message type enum
|   |-- Resource.ts        # Resource model
|   |-- ResourceCyclicIterator.ts
|   |-- Topic.ts           # Topic model
|   |-- TopicCyclicIterator.ts
|   `-- UI.ts              # DOM and chat interface behavior
|-- build.js               # Concatenates TS files and embeds config.json into app.ts
|-- index.html             # Source HTML entry
|-- package.json
`-- *.sh                   # Deployment/update helper scripts
