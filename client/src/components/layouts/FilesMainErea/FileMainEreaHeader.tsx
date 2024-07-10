import { ToggleToolTipSpanWrapper } from '@/components/ui'
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
            <ToggleToolTipSpanWrapper tip="Search">
              <Icon.search />
            </ToggleToolTipSpanWrapper>
            <ToggleToolTipSpanWrapper tip="Rate the project">
              <span
                onClick={(e) => {
                  e.currentTarget.classList.toggle('active')
                }}
              >
                <Icon.search />
              </span>
              <Icon.fiStar />
            </ToggleToolTipSpanWrapper>
            <ToggleToolTipSpanWrapper tip="More">
              <Icon.dotVertical />
            </ToggleToolTipSpanWrapper>
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
