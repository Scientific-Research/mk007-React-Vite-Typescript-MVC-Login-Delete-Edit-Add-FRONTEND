import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interfaces';

interface IJobEdit {
  job: IJob;
}

export const JobEdit = ({ job }: IJobEdit) => {
  // return <div>editing job "{job.title}"</div>;
  const { handleChangeFormField } = useContext(AppContext);

  return (
    <form action="">
      <fieldset>
        <legend>Editing Job</legend>

        <div className="row">
          <label>Title</label>
          <div>
            <input
              value={job.editItem.title}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'title')
              }
            />
          </div>
        </div>

        <div className="row">
          <label>Description</label>
          <div>
            <input
              value={job.editItem.description}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'title')
              }
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};
