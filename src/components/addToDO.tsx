import React, {RefObject, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {fillToDOList, newTileValue, Todo, updateToDOId, updateToDOItem} from "../redux/reducers/listSlice";

interface AddToDoProps {
    inputRef: RefObject<HTMLInputElement>;
    handleOtherElementClick: () => void;
    changeLight: boolean

}
const AddToDo = ({inputRef, handleOtherElementClick, changeLight}:AddToDoProps) => {

    const dispatch = useAppDispatch()
    const {titleValue,   listID} = useAppSelector(state => state.listReducer)



    return (
        <div className='flex justify-between mt-[5px] mb-[15px] transition-all duration-1000'>
            <input className={`w-4/6 mr-[10px] px-5 py-3  outline-none rounded-lg transition-all duration-1000 ${changeLight ? 'bg-[#25273c] text-white '  : 'bg-white text-black' } `}
                   placeholder="Enter new todo..."
                   onChange={
                       e => dispatch(newTileValue(e.target.value))
                   }
                   ref={inputRef}
                   value={titleValue}

                   type='text' />
            <button
                className={`w-[30%] px-5 py-3  rounded-lg text-[#6a6c81]  hover:opacity-70 transition-all duration-1000
                ${changeLight ? 'bg-[#25273c] text-white '  : 'bg-white text-black' } `}
                onClick={() => {

                    if (!!titleValue.length && !!listID.length) {
                        dispatch(updateToDOItem({value: titleValue, id:listID}))
                        dispatch(updateToDOId(''))
                        const localToDOList = localStorage.getItem('localToDOList')
                        if (localToDOList !== null) {
                            const toDO = JSON.parse(localToDOList)
                            toDO.filter((item:Todo) =>  item.id == listID  )[0].title = titleValue
                            localStorage.setItem('localToDOList', JSON.stringify(toDO) )
                        }
                    } else if (!!titleValue.length) {
                        dispatch(fillToDOList({
                            id: new Date().toISOString(),
                            title: titleValue,
                            completed: false
                        }))
                    }
                    handleOtherElementClick()
                    dispatch(newTileValue(''))

                }}
            >
                Add
            </button>
        </div>
    );
};

export default AddToDo;