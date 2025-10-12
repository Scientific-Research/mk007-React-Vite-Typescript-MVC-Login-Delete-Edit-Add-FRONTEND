export interface Job {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  skills: Skill[];
  todo: string;
}

export interface Skill {
  idCode: string;
  name: string;
  url: string;
  description: string;
}

export interface Todo {
  todo: string;
  company: string;
  title: string;
  url: string;
}

export interface TotaledSkill {
  skill: Skill;
  total: number;
  isOpen: boolean;
  lookupInfoLink: string;
}
