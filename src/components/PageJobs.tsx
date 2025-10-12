// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import Jobs from '../data/jobs.json'; getting the data from Backend using axios

// interface IJobs {
//   id: number;
//   title: string;
//   company: string;
//   url: string;
//   description: string;
//   skillList: string;
//   todo: string;
// }

// const jobs_defaultValues = {
//   id: null,
//   title: 'NONE',
//   company: 'NONE',
//   url: 'NONE',
//   description: 'NONE',
//   skillList: 'NONE',
//   todo: 'NONE',
// };

// // const url = 'http://localhost:8000/jobs';
// const url = 'http://localhost:8000';

import React, { useContext } from 'react';
import { AppContext } from '../appContext';
import { Job, Skill } from '../interfaces';

export const PageJobs = () => {
  // const [jobs, setJobs] = useState<IJobs[]>([]); // without default value
  // const [jobs, setJobs] = useState([jobs_defaultValues]); // or with default value

  // useEffect(() => {
  //   (async () => {
  //     // const jobs_API = (await axios.get('http://localhost:8000/jobs')).data; OR with url
  //     const jobs_API = (await axios.get(`${url}/jobs`)).data;
  //     console.log(jobs_API);
  //     const _jobs = [...jobs_API];
  //     setJobs(_jobs);
  //   })();
  // }, []);

  // NOTE: ALL ABOVE COMMENTED STATEMENTS ARE REPLACED WITH BELOW useContext(AppContext) AS FOLLOWING:

  const { jobs, handleDeleteJob } = useContext(AppContext);

  return (
    <div className="page pageJobs">
      <div className="jobs">
        <h2>There are {jobs.length} jobs:</h2>
        {jobs.map((job: Job) => {
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
        })}
      </div>
    </div>
  );
};
