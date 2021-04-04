import React from 'react'
import { useContext } from 'react';
import { PuchoContext } from './context';


const usePuchos = () => {
    const {state: {puchos}, actions: {addPucho}} = useContext(PuchoContext);

    return {puchos, addPucho}
}

const useOldPuchos = (fecha: Date) => {
    const {actions: {getPuchos}} = useContext(PuchoContext);

}
export default usePuchos
