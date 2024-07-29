import { OnClickType } from '@/components/ui'
import {
  getLabelButtonStatus,
  getMultiReplyState,
  getReplyStatusState,
  getSelectedThreadsDispatch,
  getSnoozeButtonStatus,
  RootState,
} from '@/context'
import { useDispatch, useSelector } from 'react-redux'
import { UseThreadActionType } from './useThreadAction.types'
import { useArchiveMutate, useDeleteMutate, useMarkAsRead, useToggleFavoriate, useTrashMutate } from '@/hooks'
import jspdf, { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export const useThreadAction = ({ items }: UseThreadActionType) => {
  const selectedThread = useSelector((state: RootState) => state.email.selectedThread)
  const selectedThreads = useSelector((state: RootState) => state.email.selectedThreads)

  const { startMutation: startMarkAsRead } = useMarkAsRead({ marktype: 'READ', threads: items })
  const { startMutation: startMarkAsUnRead } = useMarkAsRead({ marktype: 'UNREAD', threads: items })
  const { startMutation: startFavoriate } = useToggleFavoriate({ threads: items })
  const { startMutation: startTrash } = useTrashMutate({ threads: items })
  const { startMutation: startArchive } = useArchiveMutate({ threads: items })
  const { startMutation: startDelete } = useDeleteMutate({ threads: items })

  const actions = {
    Reply: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    ReplyAll: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getReplyStatusState({ replyAll: true, forward: false, attachment: false }))
    },
    Forward: ({ dispatch, items }: OnClickType) => {
      dispatch(getMultiReplyState({ alert: false, drawer: true }))
      dispatch(getReplyStatusState({ replyAll: false, forward: true, attachment: false }))
      dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    ForwardAttachment: ({ dispatch, items }: OnClickType) => {
      const container = document.createElement('div')
      container.innerHTML = items[0].textHtml
      document.body.appendChild(container)

      const images = container.getElementsByTagName('img')
      let imagesLoaded = 0

      function checkIfAllImagesLoaded() {
        imagesLoaded++
        if (imagesLoaded === images.length) {
          generatePDF(container)
        }
      }

      for (let i = 0; i < images.length; i++) {
        if (images[i].complete) {
          checkIfAllImagesLoaded()
        } else {
          images[i].addEventListener('load', checkIfAllImagesLoaded)
          images[i].addEventListener('error', checkIfAllImagesLoaded)
        }
      }

      if (images.length === 0) {
        generatePDF(container)
      }

      function generatePDF(container) {
        html2canvas(container).then(function (canvas) {
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF('p', 'mm', 'a4')
          const imgWidth = 210
          const pageHeight = 297
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          let heightLeft = imgHeight

          let position = 0

          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
          }

          pdf.save('download.pdf')

          // Remove the temporary container
          document.body.removeChild(container)
        })
      }

      // dispatch(getMultiReplyState({ alert: false, drawer: true }))
      // dispatch(getReplyStatusState({ replyAll: false, forward: true, attachment: true }))
      // dispatch(getSelectedThreadsDispatch([items[0]]))
    },
    Archive: () => {
      startArchive.mutate()
    },
    Trash: () => {
      startTrash.mutate()
    },
    Star: () => {
      if (!items[0].labelIds.includes('STARRED')) {
        startFavoriate.mutate()
      }
    },
    Delete: () => {
      startDelete.mutate()
    },
    Read: () => {
      if (items[0].labelIds.includes('UNREAD')) {
        startMarkAsRead.mutate()
      }
    },
    Unread: () => {
      if (!items[0].labelIds.includes('UNREAD')) {
        startMarkAsUnRead.mutate()
      }
    },
    Snooze: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getSnoozeButtonStatus({ snoozeButtonStatus: true, onTheFlyAction: true }))
    },
    Label: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getLabelButtonStatus({ labelButtonStatus: true, onTheFlyAction: true, move: false }))
    },
    Move: () => {
      dispatch(getSelectedThreadsDispatch([items[0]]))
      dispatch(getLabelButtonStatus({ labelButtonStatus: true, onTheFlyAction: true, move: true }))
    },
    Popup: () => {
      localStorage.setItem('emailSelected', JSON.stringify(items))
      const width = 600
      const height = 600
      const left = (screen.width - width) / 2
      const top = (screen.height - height) / 2

      window.open(
        'http://localhost:5173/email/popup?email=',
        '_blank',
        `width=${width},height=${height}, left=${left}, top=${top}`,
      )
    },
  }

  const dispatch = useDispatch()

  return { actions, dispatch, selectedThread, selectedThreads } as const
}
