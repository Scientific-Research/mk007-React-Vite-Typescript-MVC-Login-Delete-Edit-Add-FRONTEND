export interface IJob {
  id: number;
  title: string;
  company: string;
  url: string;
  description: string;
  skillList: string;
  skills: ISkill[];
  todo: string;
  userIsEditing: boolean;
  editItem: IEditItem;
}

export const editItem = {
  title: '',
  description: '',
  company: '',
  url: '',
  skillList: '',
  todo: '',
};

export interface IEditItem {
  title: string;
  description: string;
  company: string;
  url: string;
  skillList: string;
  todo: string;
}

export interface ISkill {
  idCode: string;
  name: string;
  url: string;
  description: string;
}

export interface ITodo {
  todo: string;
  company: string;
  title: string;
  url: string;
}

export interface ITotaledSkill {
  skill: ISkill;
  total: number;
  isOpen: boolean;
  lookupInfoLink: string;
}
