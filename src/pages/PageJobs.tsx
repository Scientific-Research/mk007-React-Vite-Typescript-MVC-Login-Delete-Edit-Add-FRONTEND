import React from 'react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import { JobDisplay } from '../components/JobDisplay';
import { JobForm } from '../components/JobForm';
import { IJob, FormAction } from '../interfaces';
// import '../styles/pageJobs.scss';

export const PageJobs = () => {
  const {
    jobs,
    anyJobIsBeingEdited,
    isAdding,
    toggleAddingForm,
    addingJob,
    prePageLoad,
    isAdmin,
  } = useContext(AppContext);

  useEffect(() => {
    prePageLoad();
  }, []);

  return (
    <div className="page pageJobs">
      <div className="jobs">
        <div className="jobsHeader">
          <h2>There are {jobs.length} jobs:</h2>
          {isAdmin && (
            <>
              {!anyJobIsBeingEdited() && !isAdding && (
                <button onClick={toggleAddingForm}>Add</button>
              )}
            </>
          )}
        </div>
        {isAdding && <JobForm job={addingJob} formAction={FormAction.Add} />}
        {jobs.map((job: IJob) => {
          return (
            <React.Fragment key={job.id}>
              {job.userIsEditing ? (
                <JobForm job={job} formAction={FormAction.Edit} />
              ) : (
                <JobDisplay job={job} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
