import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interfaces';

interface IJobEdit {
  job: IJob;
}

export const JobEdit = ({ job }: IJobEdit) => {
  // return <div>editing job "{job.title}"</div>;
  const { handleChangeFormField, handleToggleEditStatus } =
    useContext(AppContext);

  return (
    <form action="">
      <fieldset>
        <legend>Editing Job</legend>

        <div className="row">
          <label>Title</label>
          <div>
            {/* {job.editItem.title} only to show the value is working...*/}
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
          <label>Company</label>
          <div>
            <input
              value={job.editItem.company}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'company')
              }
            />
          </div>
        </div>

        <div className="row">
          <label>URL</label>
          <div>
            <input
              value={job.editItem.url}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'url')
              }
            />
          </div>
        </div>

        <div className="row">
          <label>Description</label>
          <div>
            <textarea
              value={job.editItem.description}
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'description')
              }
            />
          </div>
        </div>

        <div className="row">
          <label>Skill List</label>
          <div>
            <input
              value={job.editItem.skillList}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'skillList')
              }
            />
          </div>
        </div>

        <div className="row">
          <label>Next Todo</label>
          <div>
            <input
              value={job.editItem.todo}
              type="text"
              onChange={(e) =>
                handleChangeFormField(e.target.value, job, 'todo')
              }
            />
          </div>
        </div>

        <div className="buttonRow">
          <button onClick={() => handleToggleEditStatus(job)}>Clear</button>
          <button disabled>Save</button>
        </div>
      </fieldset>
    </form>
  );
};
