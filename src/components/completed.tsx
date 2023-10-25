import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {deleteToDoComp, filterListToDo} from "../redux/reducers/listSlice";

interface CompletedProps {
    changeLight: boolean
}
const Completed = ({changeLight}:CompletedProps) => {

    const dispatch = useAppDispatch()
    const {list, filterList} = useAppSelector(state => state.listReducer)
    const compTrue = list.filter(item => item.completed === true )
    const compFalse = list.filter(item => item.completed === false )


    return (
        <>
            <div
                className={` hidden md:flex justify-between items-center text-[#6a6c81] rounded-lg px-4 py-6  transition-all duration-1000 
                ${changeLight ? 'bg-[#25273c] border-[#37394e] ' : 'bg-white  border-[#e6e5e9] ' }
                 `} >
                <div className='mr-3 min-w-[115px]' >
                    {
                        filterList === 'completed' ? compTrue.length + ' Completed' : filterList === 'active' ? compFalse.length + ' Active' : `${compTrue.length}  /  ${list.length} Completed`
                    }

                </div>
                <div className='min-w-[40%] mx-[15px] text-base flex justify-between mr-3 ' >
                    <button className={`${filterList === 'all' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' }`} onClick={()=> dispatch(filterListToDo('all'))} >All</button>
                    <button className={`${filterList === 'active' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' } `} onClick={()=> dispatch(filterListToDo('active'))} >Active</button>
                    <button className={`${filterList === 'completed' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' } `} onClick={()=> dispatch(filterListToDo('completed'))} >Completed</button>
                </div>
                <button
                    className={`min-w-[130px] ${changeLight ? 'hover:text-white' : 'hover:text-black' }`}
                    onClick={() => dispatch(deleteToDoComp())}
                >
                    Delete Completed
                </button>
            </div>
            <div className=' md:hidden flex flex-col justify-between  text-[#6a6c81]  rounded-lg transition-all duration-1000' >
                <div
                    className={`flex justify-around mb-4  rounded-t-lg  px-4 py-6  transition-all duration-1000
                    ${changeLight ? 'bg-[#25273c] border-[#37394e]' : 'bg-white  border-[#e6e5e9]' }`
                } >
                    <div className='mr-3 min-w-[115px]' >
                        {
                            filterList === 'completed' ? compTrue.length + ' Completed' : filterList === 'active' ? compFalse.length + ' Active' : `${compTrue.length}  /  ${list.length} Completed`
                        }

                    </div>
                    <button
                        className={`min-w-[130px] ${changeLight ? 'hover:text-white' : 'hover:text-black' } `}
                        onClick={() => dispatch(deleteToDoComp())}
                    >
                        Delete Completed
                    </button>
                </div>
                <div
                    className={`transition-all duration-1000 px-4 py-6 rounded-b-lg 
                    ${changeLight ? 'bg-[#25273c] border-[#37394e]' : 'bg-white  border-[#e6e5e9] ' }
                 `} >
                    <div className='w-[50%] min-w-[200px] flex text-base justify-between mx-auto' >
                        <button className={`${filterList === 'all' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' } `} onClick={()=> dispatch(filterListToDo('all'))} >All</button>
                        <button className={`${filterList === 'active' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' } `} onClick={()=> dispatch(filterListToDo('active'))} >Active</button>
                        <button className={`${filterList === 'completed' ? 'text-[#029ef5]' : ''} ${changeLight ? 'hover:text-white' : 'hover:text-black' } `} onClick={()=> dispatch(filterListToDo('completed'))} >Completed</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Completed;