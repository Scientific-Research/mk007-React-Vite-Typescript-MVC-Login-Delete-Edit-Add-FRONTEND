import React from 'react';
import { Skill, IJob } from '../interfaces';

interface IJobDisplay {
  job: IJob;
  handleDeleteJob: (job: IJob) => void;
}

// export const JobDisplay: React.FC<IJobDisplay> = ({ job, handleDeleteJob }) => {
export const JobDisplay = ({ job, handleDeleteJob }: IJobDisplay) => {
  return (
    <div className="job" key={job.id}>
      <div className="title">
        <a href={job.url} target="_blank">
          {job.title}
        </a>
      </div>
      <div className="company">{job.company}</div>
      <div className="todo">NEXT TASK: {job.todo}</div>
      <div className="description">{job.description}</div>
      <div className="skills">
        {job.skills.map((skill: Skill) => {
          return (
            <React.Fragment key={skill.idCode}>
              {skill.name ? (
                <div className="skill found">
                  <div className="name">
                    <a href={skill.url} target="_blank">
                      {skill.name}
                    </a>{' '}
                    - {skill.description}
                  </div>
                </div>
              ) : (
                <div className="skill missing">
                  <div className="name">
                    <a
                      href={`https://www.google.com/search?q=${skill.idCode}+web+development`}
                      target="_blank"
                    >
                      {skill.idCode}
                    </a>{' '}
                    - ADD TO BACKEND: \src\data\skillInfos.json
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="managePanel">
        <button onClick={() => handleDeleteJob(job)}>Delete</button>
      </div>
    </div>
  );
};
