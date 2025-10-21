import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IEditItem, IJob, ITodo, ITotaledSkill, blankJob } from './interfaces';
import { cloneDeep } from 'lodash-es';
import { toast } from 'react-toastify';

interface IAppContext {
  jobs: IJob[];
  todos: ITodo[];
  totaledSkills: ITotaledSkill[];
  handleToggleTotaledSkill: (totaledSkill: ITotaledSkill) => void;
  handleDeleteJob: (job: IJob) => void;
  handleEditJob: (job: IJob) => void;
  handleChangePin: (value: string) => void;
  handleChangeFormField: (
    value: string,
    job: IJob,
    fieldIdCode: string
  ) => void;
  handleCancelForm: (e: any, job: IJob) => void;
  handleSaveEditedJob: (e: any, job: IJob) => void;
  handleResetFields: (e: any, job: IJob) => void;
  toggleAddingForm: () => void;
  anyJobIsBeingEdited: () => boolean;
  isAdding: boolean;
  addingJob: IJob;
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
  prePageLoad: () => void;
  isAdmin: boolean;
  handleIdentifyAsAdminButton: () => void;
  handleLogoutButton: () => void;
  handleSaveAddedJob: () => void;
  handleToggleAddStatus: () => void;
  handleToggleEditStatus: (job: IJob) => void;
}

interface IAppProvider {
  children: React.ReactNode;
}

const notify = (message: string) => toast(message);

const backendUrl = 'http://localhost:8000';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [totaledSkills, setTotaledSkills] = useState<ITotaledSkill[]>([]);
  const [addingJob, setAddingJob] = useState(cloneDeep(blankJob));
  const [pin, setPin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const loadJobs = async () => {
    // const _jobs = (await axios.get(`${backendUrl}/jobs`)).data;
    const rawJobs = (await axios.get(`${backendUrl}/jobs`)).data;
    const _jobs: IJob[] = [];
    rawJobs.forEach((rawJob: IJob) => {
      const _job = {
        ...rawJob,
        userIsEditing: false, // adding this property to the rawJobs using spread operator

        // assign the default values for form fields:
        editItem: {
          id: rawJob.id,
          title: rawJob.title,
          description: rawJob.description,
          company: rawJob.company,
          url: rawJob.url,
          skillList: rawJob.skillList,
          todo: rawJob.todo,
        },

        originalItems: {
          title: rawJob.title,
          description: rawJob.description,
          company: rawJob.company,
          url: rawJob.url,
          skillList: rawJob.skillList,
          todo: rawJob.todo,
        },
      };
      _jobs.push(_job);
    });
    setJobs(_jobs);
  };

  const loadTodos = async () => {
    (async () => {
      const _todos = (await axios.get(`${backendUrl}/todos`)).data;
      _todos.sort((a: ITodo, b: ITodo) => a.todo > b.todo);
      setTodos(_todos);
    })();
  };

  const loadTotaledSkills = async () => {
    const _totaledSkills: ITotaledSkill[] = (
      await axios.get(`${backendUrl}/totaledSkills`)
    ).data;
    _totaledSkills.sort(
      (a: ITotaledSkill, b: ITotaledSkill) => Number(b.total) - Number(a.total)
    );
    _totaledSkills.forEach((_totaledSkill) => {
      _totaledSkill.isOpen = false;
      if (_totaledSkill.skill.name) {
        _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.name}`;
      } else {
        _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.idCode}`;
      }
    });
    setTotaledSkills(_totaledSkills);
  };

  useEffect(() => {
    (async () => {
      // setJobs((await axios.get(`${backendUrl}/jobs`)).data);

      await loadJobs();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // const _todos = (await axios.get(`${backendUrl}/todos`)).data;
      // console.log(_todos);
      // _todos.sort((a: Todo, b: Todo) => a.todo > b.todo);
      // setTodos(_todos);

      await loadTodos();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // const _totaledSkills: TotaledSkill[] = (
      //   await axios.get(`${backendUrl}/totaledSkills`)
      // ).data;
      // _totaledSkills.sort(
      //   (a: TotaledSkill, b: TotaledSkill) => Number(b.total) - Number(a.total)
      // );
      // _totaledSkills.forEach((_totaledSkill) => {
      //   _totaledSkill.isOpen = false;
      //   if (_totaledSkill.skill.name) {
      //     _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.name}`;
      //   } else {
      //     _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.idCode}`;
      //   }
      // });
      // setTotaledSkills(_totaledSkills);

      await loadTotaledSkills();
    })();
  }, []);

  const handleToggleTotaledSkill = (totaledSkill: ITotaledSkill) => {
    totaledSkill.isOpen = !totaledSkill.isOpen;
    setTotaledSkills([...totaledSkills]);
  };

  const handleDeleteJob = async (job: IJob) => {
    // console.log('deleting the Job with id' + job.id);
    try {
      const res = await axios.delete(`${backendUrl}/jobs/${job.id}`);
      if (res.status === 200) {
        // const _jobs = jobs.filter((j) => j.id !== job.id);
        // setJobs([..._jobs]);

        // To update all three pages => Jobs, Todos, Skills
        await loadJobs();
        await loadTodos();
        await loadTotaledSkills();
      } else {
        console.log(res);
      }
    } catch (error: any) {
      console.error(`ERROR: ${error.message}`);
      const message = error.response.data.message;
      if (message) {
        console.error(`ERROR:${message}`);
      }
    }
  };

  const handleEditJob = async (job: IJob) => {
    job.userIsEditing = !job.userIsEditing;
    // This actually here is unnecessray because we have that above => loadJobs => editItem{}
    job.editItem = {
      id: job.id,
      title: job.title,
      company: job.company,
      url: job.url,
      description: job.description,
      skillList: job.skillList,
      todo: job.todo,
    };
    setJobs([...jobs]);
  };

  const handleToggleAddStatus = () => {
    setAddingJob(cloneDeep(blankJob));
    setIsAdding(!isAdding);
  };

  const handleChangeFormField = (
    value: string,
    job: IJob,
    fieldIdCode: string
  ) => {
    // job.editItem.title = value;
    job.editItem[fieldIdCode as keyof IEditItem] = value;
    setJobs([...jobs]);
  };

  // const handleToggleOriginalItems = (e: any, job: IJob) => {
  const handleResetFields = (e: any, job: IJob) => {
    e.preventDefault();
    job.editItem.title = job.originalItems.title;
    job.editItem.company = job.originalItems.company;
    job.editItem.description = job.originalItems.description;
    job.editItem.skillList = job.originalItems.skillList;
    job.editItem.todo = job.originalItems.todo;
    job.editItem.url = job.originalItems.url;
    setJobs([...jobs]);
  };

  const handleCancelForm = (e: any, job: IJob) => {
    e.preventDefault();
    // changing from the Form menu to the Jobs menu:
    job.userIsEditing = !job.userIsEditing;
    setJobs([...jobs]);
  };

  const handleSaveEditedJob = async (e: any, job: IJob) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${backendUrl}/job`, job.editItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // const res = await axios.patch(`${backendUrl}/job`);

      if (res.status === 200) {
        console.log('loading jobs');
        await loadJobs();
        await loadTodos();
        await loadTotaledSkills();
      } else {
        console.log(res);
      }
    } catch (e: any) {
      console.error(`ERROR: ${e.message}`);
      const message = e.response.data.message;
      if (message) {
        console.error(`ERROR: ${message}`);
      }
    }
  };

  const handleSaveAddedJob = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/job`,
        {
          job: addingJob.editItem,
          pin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        await loadJobs();
        await loadTodos();
        await loadTotaledSkills();
      } else {
        console.log(res);
      }
      notify(`Job "${addingJob.editItem.title}" added.`);
      setAddingJob(cloneDeep(blankJob));
      setIsAdding(false);
      setPin('');
    } catch (e: any) {
      const message = e.response.data.message;
      notify(message);
      setPin('');
    }
  };

  const toggleAddingForm = () => {
    setIsAdding(!isAdding);
  };

  const anyJobIsBeingEdited = () => {
    // jobs.forEach((job) => {
    for (const job of jobs) {
      if (job.userIsEditing) {
        console.log('true');
        return true;
      }
    }
    return false;
  };

  const handleChangePin = (pin: string) => {
    setPin(pin);
  };

  const prePageLoad = () => {
    setPin('');
  };

  const handleIdentifyAsAdminButton = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/identify-as-admin`,
        {
          pin,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        setIsAdmin(true);
        await loadJobs();
        await loadTodos();
        await loadTotaledSkills();
        setPin('');
      } else {
        notify(`There was an error.`);
        console.log(res);
      }
    } catch (e: any) {
      const message = e.response.data.message;
      notify(message);
      setPin('');
    }
  };

  const handleLogoutButton = () => {
    setIsAdmin(false);
    setPin('');
  };

  const handleToggleEditStatus = (job: IJob) => {
    job.userIsEditing = !job.userIsEditing;
    job.editItem = {
      id: job.id,
      title: job.title,
      company: job.company,
      url: job.url,
      description: job.description,
      skillList: job.skillList,
      todo: job.todo,
    };
    setJobs([...jobs]);
  };

  return (
    <AppContext.Provider
      value={{
        jobs, // at the end, we get the Jobs from our API and send it to other pages!
        todos,
        totaledSkills,
        handleToggleTotaledSkill,
        handleDeleteJob,
        handleEditJob,
        handleChangeFormField,
        handleToggleEditStatus,
        handleResetFields,
        handleSaveEditedJob,
        handleCancelForm,
        toggleAddingForm,
        anyJobIsBeingEdited,
        isAdding,
        isAdmin,
        handleChangePin,
        prePageLoad,
        handleIdentifyAsAdminButton,
        handleLogoutButton,
        handleSaveAddedJob,
        handleToggleAddStatus,
        pin,
        addingJob,
        setPin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
