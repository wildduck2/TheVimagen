import React from 'react'
import { LogDialog, FileMainErea, TaskBarTree } from '../../layouts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../context/redux/store'

const Files = () => {
  const store = useSelector((state: RootState) => state.data)

  return store.logged ? (
    <>
      <TaskBarTree />
      <FileMainErea />
    </>
  ) : (
    <LogDialog />
  )
}

export default Files
