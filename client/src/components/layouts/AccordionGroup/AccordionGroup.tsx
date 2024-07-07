import { AccordionProps, DefaultICons } from './AccordionGroup.types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui'
import { Icon } from '@/assets'

const defaultIcons: DefaultICons = {
  traingle: () => <Icon.triangle className="stroke-2 size-[18px] fill-[#FBAD38]" />,
  star: () => <Icon.regStar className="stroke-2 size-[18px] fill-[#FBAD38]" />,
  rectangle: () => <Icon.rectangleBold className="stroke-2 size-[18px] fill-[#FBAD38]" />,
  circle: () => <Icon.regCircle className="stroke-2 size-[18px] fill-[#FBAD38]" />,
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

const AccordionGroup: React.FC<AccordionProps> = () => {
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
                    {defaultIcons[item.icon]({})}
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
