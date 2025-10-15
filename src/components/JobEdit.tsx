import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interfaces';

interface IJobEdit {
  job: IJob;
}

export const JobEdit = ({ job }: IJobEdit) => {
  return <div>editing job "{job.title}"</div>;
};
