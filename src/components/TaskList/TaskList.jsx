import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
             {data?.tasks?.map((elem, idx) => {
  if (elem.active) {
    return <AcceptTask key={idx} data={elem} />;
  } else if (elem.newTask) {
    return <NewTask key={idx} data={elem} />;
  } else if (elem.completed) {
    return <CompleteTask key={idx} data={elem} />;
  } else if (elem.failed) {
    return <FailedTask key={idx} data={elem} />;
  } else {
    return <div key={idx}>Task in an unknown state</div>;
  }
}) || []}
        </div>
    )
}

export default TaskList