import { ToggleToolTipWrapper } from '../../ui'
import FileMainEreaNav from './FileMainEreaNav'
import { Icon } from '@/assets'

const FileMainEreaHeader = () => {
  return (
    <>
      <div className="file-mainerea__header">
        <div>
          <h1>
            <Icon.reqSquare />
            <span>Unique</span>
          </h1>
          <div>
            <ToggleToolTipWrapper tip="Search">
              <Icon.search />
            </ToggleToolTipWrapper>
            <ToggleToolTipWrapper
              onClick={(e) => {
                e.currentTarget.classList.toggle('active')
              }}
              tip="Rate the project"
            >
              <Icon.fiStar />
            </ToggleToolTipWrapper>
            <ToggleToolTipWrapper tip="More">
              <Icon.dotVertical />
            </ToggleToolTipWrapper>
          </div>
        </div>
        {/* TODO: make data and loop on the data */}
        <div>
          <div>
            <p>
              <Icon.reqSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <Icon.reqSquare />
              <span>Unique</span>
            </p>
            <span>/</span>
          </div>
          <div>
            <p>
              <Icon.reqSquare />
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
