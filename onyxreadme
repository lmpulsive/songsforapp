
# Onyx Note Taker

**Onyx** is a sleek, Obsidian-inspired note-taking application designed for efficiency and a focused writing experience. It features a minimalist black and red theme, robust Markdown editing capabilities, and an innovative YouTube video transcription feature powered by the Gemini API. Notes are stored locally in the browser's LocalStorage.

## Core Technologies

*   **Frontend:** React, TypeScript
*   **AI Integration:** Google Gemini API (`gemini-2.5-flash-preview-04-17`)
*   **Styling:** CSS (Variables, Flexbox, Grid)
*   **Local Storage:** Browser's LocalStorage for note persistence
*   **Build/Module System:** ES Modules via import maps (served by a simple static server, or directly in browser for development)

## Project Structure

The project is organized into a `public` directory for static assets and a `src` directory for the main application code.

```
onyx-note-app/
├── public/
│   ├── assets/
│   │   └── red_diamond_icon.png  # App icon
│   └── data/
│       └── examples.json         # Example YouTube URLs (currently unused by Onyx)
├── src/
│   ├── components/
│   │   ├── ObsidianLiteApp.tsx   # Main application shell, state management, UI orchestration
│   │   ├── FileExplorer.tsx      # Sidebar for note listing, creation, deletion
│   │   ├── EditorView.tsx        # Markdown editor and preview pane
│   │   ├── ExampleGallery.tsx    # (Unused by Onyx, relic from template)
│   │   └── ContentContainer.tsx  # (Empty, relic from template)
│   ├── lib/
│   │   ├── localStorageService.ts# Handles all CRUD operations with browser LocalStorage
│   │   ├── textGeneration.ts     # Interface for Gemini API text generation
│   │   ├── prompts.ts            # Gemini API prompt templates
│   │   ├── formatTranscription.ts# Logic to format raw transcript into Obsidian MD using Gemini
│   │   ├── youtube.ts            # Utilities for YouTube URL validation, ID extraction, title fetching
│   │   ├── types.ts              # TypeScript type definitions for core data structures
│   │   └── parse.ts              # (Mostly empty, placeholder)
│   ├── context.ts                # (Unused by Onyx, relic from template)
│   ├── App.tsx                   # Root React component, global styles
│   ├── index.css                 # Global stylesheets, CSS variables, base element styling
│   ├── index.tsx                 # React application entry point
│   └── index.html                # Main HTML page, sets up import maps, loads CSS/JS
└── metadata.json                 # Project metadata for AI Studio Frame
```

## Key Features & Functionality

### 1. Note Management (CRUD)
*   **Create:** Users can create new notes, which are then added to the `FileExplorer` and opened in the `EditorView`.
*   **Read:** Notes are listed in the `FileExplorer`. Selecting a note loads its content into the `EditorView`.
*   **Update:** Note titles and content can be edited in the `EditorView`. Changes are saved automatically on blur or manually via a save button.
*   **Delete:** Notes can be deleted from the `FileExplorer`.
*   **Persistence:** All notes are stored in the browser's LocalStorage via `localStorageService.ts`.

### 2. Markdown Editor & Preview
*   The `EditorView.tsx` component provides:
    *   A `textarea` for writing Markdown.
    *   A live preview pane that renders the Markdown input into HTML.
    *   The custom `renderMarkdown` function within `EditorView.tsx` handles parsing various Markdown syntaxes (headings, lists, task lists, code blocks, tables, images, links, bold, italics, strikethrough, blockquotes, horizontal rules).
*   **Theming:** Note content is primarily white text on a black background for readability, with red accents for semantic elements (links, bold, list markers, etc.).

### 3. YouTube Video Transcription & Note Generation
*   **Modal Interface (`ObsidianLiteApp.tsx`):**
    *   Users can open an "Import YouTube Video" modal.
    *   Input for YouTube video URL.
    *   Checkbox to request timestamps in the transcription.
*   **Process Flow (`handleSubmitImport` in `ObsidianLiteApp.tsx`):**
    1.  **URL Validation:** The provided URL is validated using `validateYoutubeUrl` from `lib/youtube.ts`.
    2.  **Transcription:**
        *   The `generateText` function (`lib/textGeneration.ts`) calls the Gemini API (`gemini-2.5-flash-preview-04-17`) with the video URL and a specific prompt from `lib/prompts.ts` (either `TRANSCRIPTION_PROMPT` or `TRANSCRIPTION_WITH_TIMESTAMPS_PROMPT`).
        *   The Gemini API processes the video (presumably server-side through the API) and returns the raw transcript.
    3.  **Title Fetching:** `getYouTubeVideoTitle` (`lib/youtube.ts`) attempts to fetch the video title using YouTube's oEmbed endpoint.
    4.  **Note Formatting:**
        *   The `formatTranscriptionToObsidian` function (`lib/formatTranscription.ts`) takes the raw transcript, video URL, video title, and timestamp preference.
        *   It constructs another prompt (`GET_STRUCTURED_OBSIDIAN_NOTE_JSON_PROMPT` from `lib/prompts.ts`) asking the Gemini API to format the transcript into a JSON object containing a `title` and `markdownContent`.
        *   The `markdownContent` includes YAML frontmatter (title, source URL, generation date, tags) and the structured Markdown body.
        *   This step also uses `generateText` but with `responseMimeType: "application/json"`.
    5.  **Note Creation:** The parsed title and markdown content are used to create a new note via `db.createNewNote` (`lib/localStorageService.ts`).
    6.  The new note is added to the application state, and the UI updates.
*   **Error Handling:** The import process includes status messages and error handling, displaying concise messages to the user while logging detailed errors to the console.

### 4. Theming & Styling
*   **Onyx Theme:** A strict black and red theme is applied globally.
    *   Primary Background: Black (`#080808`, `#000000`)
    *   Primary Text & Accents: Red (`#E53935`, `#C62828`)
    *   Note Content Text: White/Light Grey (`#E0E0E0`) for readability.
*   **`index.css`:** Defines CSS custom variables for colors and fonts, and applies base styles to HTML elements, buttons, inputs, and scrollbars.
*   **Component-Level Styles:** Each component often includes its own `<style>` block for scoped CSS, leveraging the global CSS variables.

## Code Architecture & Component Relations

*   **`index.html` & `index.tsx`:** The entry point. `index.html` sets up the page and import maps. `index.tsx` renders the React application into the root DOM element.
*   **`App.tsx`:** The top-level React component. It includes global styles (like body defaults and Google Symbols font setup) and renders the main application component, `<ObsidianLiteApp />`.
*   **`ObsidianLiteApp.tsx`:** This is the central orchestrator.
    *   Manages the primary application state: list of notes (`notes`), the ID of the currently active note (`activeNoteId`), loading states, modal visibility, and import process state.
    *   Handles interactions between `FileExplorer` and `EditorView`.
    *   Contains the logic for the YouTube import modal, including API calls via helper functions from `lib/`.
    *   Provides callback functions to child components for actions like selecting, creating, deleting, and saving notes.
*   **`FileExplorer.tsx`:**
    *   Receives the list of notes and the active note ID as props from `ObsidianLiteApp`.
    *   Renders the list of notes.
    *   Calls `onSelectNote`, `onNewNote`, `onDeleteNote` (passed from `ObsidianLiteApp`) based on user interaction.
*   **`EditorView.tsx`:**
    *   Receives the `activeNote` object and `onSaveNote` callback from `ObsidianLiteApp`.
    *   Manages its own internal state for the current title and content being edited (`currentTitle`, `currentContent`), and whether there are unsaved changes (`isDirty`).
    *   Handles user input for the title and Markdown content.
    *   Calls `onSaveNote` when changes need to be persisted.
    *   Implements the Markdown to HTML rendering logic for the preview pane.
*   **`lib/` directory:**
    *   **`localStorageService.ts`:** Decouples note storage logic from components. Used by `ObsidianLiteApp` for all note persistence.
    *   **`textGeneration.ts`:** A generic wrapper for making `generateContent` calls to the Gemini API. It handles API key setup, constructing the request, and basic response/error checking. Used by `ObsidianLiteApp` (for transcription) and `formatTranscription.ts` (for formatting).
    *   **`formatTranscription.ts`:** Orchestrates the AI-powered formatting of a transcript into an Obsidian note structure. It uses `textGeneration.ts` to call the Gemini API.
    *   **`youtube.ts`:** Provides specific utilities for handling YouTube URLs, isolating this logic from other parts of the application.
    *   **`prompts.ts`:** Centralizes all prompts sent to the Gemini API, making them easy to manage and update.
    *   **`types.ts`:** Provides shared type definitions, ensuring type safety across the application.

## API Key Management

The API key for the Gemini API is expected to be available as `process.env.API_KEY`.
In `index.html`, there's a script for development environments (when `window.location.hostname === "localhost"`) that prompts the user for an API key if not found in `localStorage` and then makes it available on `globalThis.process.env.API_KEY`. This is a development convenience and not suitable for production.

## Error Handling

*   **API Calls (`textGeneration.ts`):** Includes checks for API key presence, prompt/response blockages, and other finish reasons from the Gemini API. Errors are thrown to be caught by the calling function.
*   **JSON Parsing (`formatTranscription.ts`):** Specifically catches errors during `JSON.parse()` of the AI's response for structured notes. It throws a more detailed error, including the raw response, which is helpful for debugging.
*   **User Interface (`ObsidianLiteApp.tsx`):**
    *   The YouTube import modal displays user-friendly error messages for invalid URLs or issues during the import process.
    *   A specific, concise error message is shown if the AI's JSON response for a structured note cannot be parsed, preventing the raw (potentially very long) response from breaking the UI. Detailed errors are logged to the console.

## Roadmap & Future Enhancements

Onyx provides a solid foundation for a powerful note-taking and content generation tool. Future development could focus on:

### Core Note-Taking Features
*   **Advanced Search:** Implement full-text search across all notes, possibly with filtering capabilities.
*   **Tagging System:** Develop a more robust tagging system with tag suggestions, a tag pane, and tag-based filtering.
*   **Rich Text Toolbar:** Add a toolbar to the Markdown editor for common actions (bold, italics, lists, inserting links/images) to assist users less familiar with Markdown.
*   **Note Linking / Backlinks:** Implement Obsidian-style `[[wikilink]]` support and display backlinks.
*   **Customizable Sort Order:** Allow users to sort notes by different criteria (title, date created, date modified).

### Data Management & Sync
*   **Cloud Sync/Backup:** Integrate with cloud storage providers (e.g., Firebase, Dropbox, or a custom backend) to allow users to sync their notes across devices and have backups.
*   **Export/Import:**
    *   Allow exporting notes in various formats (e.g., individual MD files, ZIP archive, PDF).
    *   Allow importing notes from other formats or services.

### AI & Automation
*   **In-Note AI Actions:** Integrate Gemini for tasks within the editor, such as:
    *   Summarizing selected text.
    *   Expanding on ideas.
    *   Checking grammar/style.
    *   Translating text.
*   **Improved Transcription Accuracy:** Explore options or prompts to further improve transcription quality or speaker diarization if supported by the API.
*   **Content Generation from Other Sources:** Extend import functionality to other media types or URLs (e.g., articles, audio files).

### UX & Customization
*   **Customizable Themes:** Allow users to create or select different color themes beyond the default Onyx.
*   **Plugin System:** Design an architecture that would allow for third-party or community-developed plugins to extend functionality.
*   **Keyboard Shortcuts:** Implement a comprehensive set of keyboard shortcuts for navigation and editing.
*   **Settings Panel:** A dedicated area for managing preferences, API key (if a more secure input method is desired), and theme settings.
*   **Mobile Responsiveness & PWA:** Further optimize for mobile devices and explore Progressive Web App (PWA) capabilities for an app-like experience.

### Technical & Performance
*   **State Management:** For a larger application, consider a more robust state management library (e.g., Zustand, Redux Toolkit).
*   **Code Splitting/Lazy Loading:** Optimize initial load time as the application grows.
*   **Testing:** Implement a comprehensive suite of unit, integration, and end-to-end tests.
*   **Secure API Key Handling:** For a deployed application, move API key handling to a backend proxy to avoid exposing it on the client-side.
```
