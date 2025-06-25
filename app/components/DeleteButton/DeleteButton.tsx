import React from 'react'
import { Trash2 } from '@deemlol/next-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface DeleteButtonProps {
    deleteFunction: Function;
    style: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteFunction, style }) => {

    const locks = useSelector((state: RootState) => state.mainData.locks);

    return (
        <Trash2
            className={` transition-all duration-300 
            ${locks.deleteLock ? 'text-gray' :
                    "text-gray hover:text-sec hover:shadow-lg active:text-sec active:shadow-lg active:opacity-80 active:scale-75"}
             ${style}`
            }
            onClick={() => {
                if (!locks.deleteLock) {
                    deleteFunction()
                }
            }}
        />
    )
}

export default DeleteButton