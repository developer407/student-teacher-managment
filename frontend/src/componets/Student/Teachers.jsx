import React from 'react'
import { TeacherCard } from './TeacherCard'
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherList } from '../../state/Authentication/Action';

function Teachers() {
    const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    dispatch(getTeacherList(jwt));
  }, []);
  return (
    <div>
        <h1 className='py-2 font-bold text-2xl'>Top Teachers</h1>
        <div className='flex flex-wrap gap-5'>
            {auth.teachers.map((item)=> <TeacherCard teacher={item}/>)}
        </div>
    </div>
  )
}

export default Teachers