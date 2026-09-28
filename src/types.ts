export interface TeamMember {
  id: string;
  name: string;
  role: string;
  coreFunction: string;
  tagline: string;
  bio: string;
  avatarIcon: string;
  imageUrl?: string;
  disciplines: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  creator: string;
  creatorId: 'kunal-sabale' | 'animesh-dabhade' | 'rajani-mourya';
  featuredRole?: string;
  category: string;
  year: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  collisionEnergy: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'CLASSIFIED';
  repoName: string;
  repoUrl: string;
  liveUrl?: string;
  contributions: {
    builder: string;
    ideator: string;
    presenter: string;
  };
}

export interface TelemetryData {
  fps: number;
  drawCalls: number;
  triangles: number;
  scrollProgress: number;
  velocity: number;
  currentBeat: number;
  mouseX: number;
  mouseY: number;
  cameraZ: number;
  acceleratorFrequency: number;
}
