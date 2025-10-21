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
  originalItems: IOriginalItems;
}

// export const editItem = {
//   title: '',
//   description: '',
//   company: '',
//   url: '',
//   skillList: '',
//   todo: '',
// };

export interface IEditItem {
  id: number | string;
  title: string;
  description: string;
  company: string;
  url: string;
  skillList: string;
  todo: string;
}

export interface IOriginalItems {
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

export enum FormAction {
  Edit = 'formActionEdit',
  Add = 'formActionAdd',
}

export const blankJob: IJob = {
  id: 0,
  title: '',
  company: '',
  url: '',
  description: '',
  skillList: '',
  skills: [],
  todo: '',
  userIsEditing: false,
  editItem: {
    id: 0,
    title: '',
    company: '',
    url: '',
    description: '',
    skillList: '',
    todo: '',
  },
  originalItems: {
    title: '',
    description: '',
    company: '',
    url: '',
    skillList: '',
    todo: '',
  },
};
