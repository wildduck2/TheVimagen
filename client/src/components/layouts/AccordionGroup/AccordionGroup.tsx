import { AccordionProps, DefaultICons } from './AccordionGroup.types'
import { IoIosArrowUp } from 'react-icons/io'
import { FaRegStar } from 'react-icons/fa'
import { PiRectangleBold } from 'react-icons/pi'
import { FaRegCircle } from 'react-icons/fa'
import { TbTriangle } from 'react-icons/tb'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui'

const defaultIcons: DefaultICons = {
  traingle: <TbTriangle style={{ strokeWidth: 2 }} size="18px" color="#FBAD38" />,
  star: <FaRegStar style={{ strokeWidth: 2 }} size="18px" color="#6E5CDE" />,
  rectangle: <PiRectangleBold style={{ strokeWidth: 2 }} size="18px" color="#FC4E57" />,
  circle: <FaRegCircle style={{ strokeWidth: 2 }} size="18px" color="#4E9F39" />,
}

const data = [
  {
    id: 1,
    icon: 'star',
    name: 'Mirage',
  },
  {
    id: 2,
    icon: 'traingle',
    name: 'Mashroom',
  },
  {
    id: 3,
    icon: 'rectangle',
    name: 'Weedo',
  },
  {
    id: 4,
    icon: 'circle',
    name: 'Lonely walls',
  },
]

const AccordionGroup: React.FC<AccordionProps> = ({ dataa }) => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>FAVORITES</AccordionTrigger>
          <AccordionContent>
            {data.map((item) => {
              return (
                <div key={item.id} className="files-tree__accordion__item">
                  <div className="files-tree__accordion__item__title">
                    {defaultIcons[item.icon]}
                    <span>{item.name}</span>
                  </div>
                  {/* <div>
                  {item.children.map((child) => {
                  return (
                    <div key={child.id}>
                      {React.createElement(defaultIcons[child.icon])}
                      <span>{child.name}</span>
                    </div>
                  );
                })} 
              </div> */}
                </div>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default AccordionGroup

{
  /* <div className="files-tree__accordion">
          <div className="files-tree__accordion__title" onClick={showAccordionHandler}>
            <IoIosArrowUp />
            <span>FAVORITES</span>
          </div>
          <div className="files-tree__accordion__list h-[0px] accordion-up" ref={accordionRef}>
            {data.map((item) => {
              return (
                <div key={item.id} className="files-tree__accordion__item">
                  <div className="files-tree__accordion__item__title">
                    {defaultIcons[item.icon]}
                    <span>{item.name}</span>
                  </div>
                  {/* <div>
                    {item.children.map((child) => {
                    return (
                      <div key={child.id}>
                        {React.createElement(defaultIcons[child.icon])}
                        <span>{child.name}</span>
                      </div>
                    );
                  })} 
                </div>
                </div>
              );
            })}
          </div>
        </div> */
}
