import React from 'react'

import { Search } from 'lucide-react'
import { FaRegSquare } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ToggleToolTipWrapper } from '../../ui'
import { FiStar } from 'react-icons/fi'
import FileMainEreaNav from './FileMainEreaNav'

const FileMainEreaHeader = () => {
  return (
    <>
      <div className="file-mainerea__header">
        <div>
          <h1>
            <FaRegSquare />
            <span>Unique</span>
          </h1>
          <div>
            <ToggleToolTipWrapper tip="Search">
              <Search />
            </ToggleToolTipWrapper>
            <ToggleToolTipWrapper
              onClick={(e) => {
                e.currentTarget.classList.toggle('active')
              }}
              tip="Rate the project"
            >
              <FiStar />
            </ToggleToolTipWrapper>
            <ToggleToolTipWrapper tip="More">
              <BsThreeDotsVertical />
            </ToggleToolTipWrapper>
          </div>
        </div>
        {/* TODO: make data and loop on the data */}
        <div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <FaRegSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
        </div>
      </div>
      <FileMainEreaNav />
    </>
  )
}

export default FileMainEreaHeader
