import React, { useEffect} from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useAppDispatch, useAppSelector} from "../hooks";
import '../style/listToDo.scss'
import {
    deleteToDoItem,
    fillToDOList,
    newTileValue,
    Todo,
    updateToDOComp,
    updateToDOId
} from "../redux/reducers/listSlice";
import {hover} from "@testing-library/user-event/dist/hover";


interface ListsToDoProps {
    handleOtherElementClick: () => void;
    changeLight: boolean

}


const ListsToDo = ({handleOtherElementClick, changeLight}:ListsToDoProps) => {

    const dispatch = useAppDispatch()
    const {list , filterList} = useAppSelector(state => state.listReducer)



    useEffect(()=>{

        if (!list.length ) {
            const localToDOList = localStorage.getItem('localToDOList')
            if (localToDOList !== null  ) {
                const toDO = JSON.parse(localToDOList)
                !!toDO.length && toDO.map((item:Todo) => dispatch(fillToDOList(item)))

            }
        }else {
            localStorage.setItem('localToDOList', JSON.stringify(list) )
        }

    },[list.length])


    return (
        <div className=' h-[50vh] overflow-auto rounded-lg '>
            {
               (
                   filterList=== 'completed' ? list.filter(item => item.completed === true)
                       : filterList === 'active' ? list.filter(item => item.completed === false)
                       : list
               ).map(itemList  => {
                    return <div
                        key={itemList.id}
                        className={`listWrapper flex justify-between items-center border-b  px-4 py-6  transition-all duration-1000
                        ${changeLight ? 'bg-[#25273c] text-white border-[#37394e]' : 'bg-white text-black border-[#e6e5e9]' }
                        `} >
                        <input
                            className='w-[25px] h-[25px] border rounded-[50%]  cursor-pointer transition-all duration-1000'
                            type='checkbox'
                            checked={itemList.completed}
                            onChange={() => dispatch(updateToDOComp(itemList.id))}
                        />
                        <p
                            className={`w-full ml-[10px] text-start ${itemList.completed ? 'line-through text-[#6a6c81] ' : ''}`}
                        >
                            {itemList.title}
                        </p>
                        <div className='w-[20%] flex justify-between transition-all duration-1000' >
                            <span
                                className='w-1/2 text-center cursor-pointer'
                                onClick={() => {

                                    dispatch(newTileValue(itemList.title))
                                    dispatch(updateToDOId(itemList.id))
                                    handleOtherElementClick()

                                }}

                            >
                                <BorderColorIcon />
                            </span>
                            <span
                                className='w-1/2 text-center cursor-pointer text-red-700'
                                onClick={()=> dispatch(deleteToDoItem(itemList.id))}
                            >
                                <DeleteForeverIcon />
                            </span>

                        </div>
                    </div>
                })
            }


        </div>
    );
};

export default ListsToDo;