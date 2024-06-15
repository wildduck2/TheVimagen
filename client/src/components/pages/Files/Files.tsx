import { useSelector } from "react-redux"

import { FileMainErea, LogDialog, TaskBarTree } from "@/components/layouts"
import { RootState } from "@/context"

export const Files = () => {
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

