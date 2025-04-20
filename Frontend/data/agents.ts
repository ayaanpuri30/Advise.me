export interface Agent {
  id: number;
  title: string;
  description: string;
  rating: number;
  imageSrc?: string;
  category?: string;
  verified?: boolean;
}

export const agents: Agent[] = [
  {
    id: 0,
    title: "Albert (Uncle Al)",
    description: "I'm an old man who loves to chat about the past.",
    rating: 5,
    imageSrc: "/images/old.webp",
    category: "Leisure",
  },
  {
    id: 1,
    title: "Developer Sara",
    description: "Need help finishing up that python script?",
    rating: 4.5,
    imageSrc: "/images/girl.webp",
    category: "Coding",
    verified: true,
  },
  {
    id: 2,
    title: "Painter Matt",
    description: "Explore creative ideas and get inspired.",
    rating: 4.7,
    imageSrc: "/images/artist.webp",
    category: "Creativity",
    verified: true,
  },
  {
    id: 3,
    title: "Dr. Magnus",
    description: "Got a stomach ache? I have a big hat and a bigger description.",
    rating: 4.6,
    imageSrc: "/images/hat.webp",
    category: "Health",
    verified: true,
  },
  {
    id: 4,
    title: "Image Classifier",
    description: "Identify objects and scenes in images",
    rating: 4.3,
    imageSrc: "/images/old.webp",
    category: "Image",
  },
  {
    id: 5,
    title: "Language Translator",
    description: "Translate text between multiple languages",
    rating: 4.7,
    imageSrc: "/images/girl.webp",
    category: "Text",
  },
  {
    id: 6,
    title: "Data Analyzer",
    description: "Extract insights from complex datasets",
    rating: 4.4,
    imageSrc: "/images/artist.webp",
    category: "Data",
  },
  {
    id: 7,
    title: "Speech Recognition",
    description: "Convert spoken language into written text",
    rating: 4.2,
    imageSrc: "/images/hat.webp",
    category: "Audio",
  },
]; 