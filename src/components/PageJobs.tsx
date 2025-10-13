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
import { IJob, Skill } from '../interfaces';
import { JobDisplay } from '../JobDisplay';

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
        {jobs.map((job: IJob) => {
          return <JobDisplay job={job} handleDeleteJob={handleDeleteJob} />;
        })}
      </div>
    </div>
  );
};
