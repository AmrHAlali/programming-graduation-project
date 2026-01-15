import { colors } from "../theme";
import { Track } from "../types/tracks";

// Utility
function getReadableTextColor(bgColor: string): string {
  const color = bgColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16) / 255;
  const g = parseInt(color.substring(2, 4), 16) / 255;
  const b = parseInt(color.substring(4, 6), 16) / 255;

  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  return lum > 0.65 ? colors.neutrals.black : colors.neutrals.white;
}

export type TrackInfo = {
  id: number;
  label: string;
  backgroundColor: string;
  textColor: string;
  track?: Track;
  description?: string;
};

export const TRACK_DATA: Record<Track, TrackInfo & { description: string }> = {
  [Track.FRONTEND]: {
    id: 1,
    label: "Front-End",
    backgroundColor: colors.tracks.frontend,
    textColor: getReadableTextColor(colors.tracks.frontend),
    track: Track.FRONTEND,
    description:
      "The Front-End track focuses on building the parts of an application that users see and interact with. It emphasizes creating responsive layouts, intuitive interfaces, and visually appealing designs using tools like HTML, CSS, and JavaScript frameworks. This track is all about shaping smooth, accessible, and polished user experiences across a wide range of devices."
  },
  [Track.BACKEND]: {
    id: 2,
    label: "Back-End",
    backgroundColor: colors.tracks.backend,
    textColor: getReadableTextColor(colors.tracks.backend),
    track: Track.BACKEND,
    description:
      "The Back-End track deals with the inner workings of applications—everything happening behind the scenes. It covers server-side logic, APIs, authentication, data processing, and overall system reliability. Students explore technologies that allow apps to handle complex operations efficiently, securely, and at scale."
  },
  [Track.MOBILE]: {
    id: 3,
    label: "Mobile",
    backgroundColor: colors.tracks.mobile,
    textColor: getReadableTextColor(colors.tracks.mobile),
    track: Track.MOBILE,
    description:
      "The Mobile track focuses on creating applications specifically tailored for smartphones and tablets. It covers both native and cross-platform development, teaching how to design for smaller screens, optimize performance, and build interfaces that feel natural to mobile users. This track highlights the unique challenges and creative possibilities of mobile environments."
  },
  [Track.DATABASE]: {
    id: 4,
    label: "Database",
    backgroundColor: colors.tracks.database,
    textColor: getReadableTextColor(colors.tracks.database),
    track: Track.DATABASE,
    description:
      "The Database track explores how information is stored, structured, and retrieved. It covers relational and non-relational systems, query languages, data modeling, indexing, and optimization. This track centers on designing reliable data systems that scale effectively and support the features of modern applications."
  },
  [Track.DEVOPS]: {
    id: 5,
    label: "DevOps",
    backgroundColor: colors.tracks.devops,
    textColor: getReadableTextColor(colors.tracks.devops),
    track: Track.DEVOPS,
    description:
      "The DevOps track bridges development and operations to create smooth, automated workflows. Students learn about CI/CD pipelines, infrastructure management, containerization, cloud platforms, and monitoring. The goal is to build robust, maintainable systems that deploy quickly and operate reliably."
  },
  [Track.GAME]: {
    id: 6,
    label: "Game Development",
    backgroundColor: colors.tracks.game,
    textColor: getReadableTextColor(colors.tracks.game),
    track: Track.GAME,
    description:
      "The Game Development track dives into the art and engineering behind interactive digital experiences. It covers game engines, physics, animation, level design, and storytelling. Students learn how to transform creative ideas into engaging, responsive games that blend technology and imagination."
  },
  [Track.AI]: {
    id: 7,
    label: "AI / Machine Learning",
    backgroundColor: colors.tracks.ai,
    textColor: getReadableTextColor(colors.tracks.ai),
    track: Track.AI,
    description:
      "The AI / Machine Learning track teaches how to build systems that learn from data and make predictions or decisions. It covers model training, neural networks, datasets, evaluation techniques, and practical applications like classification and pattern recognition. This track encourages analytical thinking and experimentation with intelligent systems."
  },
  [Track.SECURITY]: {
    id: 8,
    label: "Cybersecurity",
    backgroundColor: colors.tracks.security,
    textColor: getReadableTextColor(colors.tracks.security),
    track: Track.SECURITY,
    description:
      "The Cybersecurity track focuses on protecting systems, networks, and data from digital threats. Students explore vulnerabilities, defensive strategies, secure design principles, and ethical considerations. The goal is to build the skills needed to identify risks, strengthen defenses, and maintain trust in digital environments."
  }
};

export const TRACK_LIST: TrackInfo[] = Object.values(TRACK_DATA);

export function getTrackById(id: number): TrackInfo | undefined {
  return TRACK_LIST.find(track => track.id === id);
}
