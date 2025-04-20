Advise.me 📚✨
A community‑powered, multimodal advice platform that makes advanced AI feel as easy as texting a friend.

<p align="center"> <img src="https://raw.githubusercontent.com/your‑org/advise.me/main/docs/hero.png" alt="Advise.me hero" width="650"> </p>

 

🚨 Problem Statement
AI tools are powerful but rarely arrive in a turnkey package—especially for people who aren’t steeped in the jargon or tooling. How can we make AI approachable for absolutely anyone, whatever their use case?

💡 What it does
Advise.me lets users “talk out” a problem with a tailor‑made AI expert—an Advisor.
With a growing community gallery, nearly every niche is covered and everyone can benefit from AI.

Chat with multimodal Advisors (text + file + audio upload).

Share new Advisors with the community—just describe the persona and upload starter files.

Drive AI literacy in under‑represented communities while contributing to a social‑good mission.

🏗 How we built it

Layer	Tech	Notes
Frontend	Next.js 13, React 18, Tailwind CSS	Instant feedback & pre‑rendered Advisor gallery
Backend	Python Flask, Gunicorn	Thin API: /chat endpoint handles text, PDF/TXT extraction + audio transcription
AI	Google Gemini API	Prompt‑engineering for persona control; inline & Files‑API for audio
Storage	Local FS / Cloud Storage	Separate buckets for images/, docs/, audio/
Inspiration	Hugging Face	We re‑imagined the model hub as a consumer hub
🖼 Architecture
┌──────────────┐          POST /chat          ┌──────────────┐
|  Frontend    | ───────────────────────────▶ |   Flask API  |
|  (Next.js)   |                             |  (Gunicorn)  |
└──────────────┘ ◀─────────────────────────── └──────────────┘
     ▲  ▲         JSON reply (Advisor)             │
     │  │                                         ┌▼──────────┐
Upload files (img/pdf/txt/wav/mp3)                |  Gemini   |
                                                  |  API      |
                                                  └───────────┘
🚧 Current limitations
Hackathon build uses prompt engineering + Gemini rather than custom‑trained models.

File extraction supports PDF/TXT; complex docs (DOCX, PPT) are on the roadmap.

Advisor discovery relies on manual tagging—future work will add auto‑metadata and rating.
