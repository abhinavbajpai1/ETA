import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('employees');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const task = { taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false };
        
        const updatedUserData = userData.map(user => {
            if (user.firstName === assignTo) {
                const updatedUser = {
                    ...user,
                    tasks: [...user.tasks, task],
                    taskCounts: { ...user.taskCounts, newTask: user.taskCounts.newTask + 1 }
                };
                return updatedUser;
            }
            return user;
        });

        setUserData(updatedUserData);
        localStorage.setItem('employees', JSON.stringify(updatedUserData));
        console.log(updatedUserData);

        setTaskTitle('');
        setCategory('');
        setAssignTo('');
        setTaskDate('');
        setTaskDescription('');
    };

    return (
        <div className='p-5 bg-gray-900 mt-5 rounded-lg shadow-lg text-white'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-400 mb-1'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='text-sm py-2 px-3 w-4/5 rounded-lg outline-none bg-gray-800 border border-gray-600 text-white mb-4'
                            type='text' placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-400 mb-1'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-2 px-3 w-4/5 rounded-lg outline-none bg-gray-800 border border-gray-600 text-white mb-4'
                            type='date'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-400 mb-1'>Assign to</h3>
                        <select
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className='text-sm py-2 px-3 w-4/5 rounded-lg outline-none bg-gray-800 border border-gray-600 text-white mb-4'>
                            <option value='' disabled>Select an employee</option>
                            {userData.map(user => (
                                <option key={user.firstName} value={user.firstName}>{user.firstName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-400 mb-1'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-2 px-3 w-4/5 rounded-lg outline-none bg-gray-800 border border-gray-600 text-white mb-4'
                            type='text' placeholder='design, dev, etc'
                        />
                    </div>
                </div>
                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-400 mb-1'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded-lg outline-none bg-gray-800 border border-gray-600 text-white'
                    ></textarea>
                    <button className='bg-blue-500 py-3 hover:bg-blue-600 px-5 rounded-lg text-sm mt-4 w-full text-white'>Create Task</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
