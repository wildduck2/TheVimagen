import React from 'react'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    buttonVariants,
} from '..'
import { cn, signoutAsync } from '@/utils'
import { DropdownMenuGroupProps, DropDownMenuWrapperType } from './DropDownMenuWrapper.types'
import { Icon } from '@/assets'

const menuData = {
    first: [
        {
            id: '1',
            title: 'Profile',
            icon: <Icon.user />,
            command: '⇧⌘P',
        },
        {
            id: '2',
            title: 'Billing',
            icon: <Icon.creditCard />,
            command: '⌘B',
        },
        {
            id: '3',
            title: 'Settings',
            icon: <Icon.settings />,
            command: '⌘S',
            cb: () => console.log('Item 1 clicked'),
        },
        {
            id: '4',
            title: 'Keyboard shortcuts',
            icon: <Icon.keyboard />,
            command: '⌘K',
            cb: () => console.log('Item 1 clicked'),
        },
    ],
    second: [
        {
            id: '5',
            title: 'Team',
            icon: <Icon.users />,
            command: '',
            cb: () => console.log('Item 1 clicked'),
        },
        {
            id: '6',
            title: 'Invite Users',
            icon: <Icon.userPlus />,
            command: '',
            cb: () => console.log('Item 1 clicked'),
        },
        {
            id: '7',
            title: 'New Team',
            icon: <Icon.plusCircle />,
            command: '⌘T',
            cb: () => console.log('Item 1 clicked'),
        },
    ],
    third: [
        {
            id: '8',
            title: 'Github',
            icon: <Icon.github />,
            command: '',
            cb: () => console.log('Item 1 clicked'),
        },
        {
            id: '9',
            title: 'Support',
            icon: <Icon.cloud />,
            command: '',
            cb: () => console.log('Item 1 clicked'),
        },
        {
            id: '10',
            title: 'Discord',
            icon: <Icon.discord />,
            command: '',
            cb: () => console.log('Item 1 clicked'),
        },
    ],
    fourth: [
        {
            id: '11',
            title: 'Log out',
            icon: <Icon.logOut />,
            command: '⇧⌘Q',
            cb: signoutAsync,
        },
    ],
}

const DropdownMenuGroupWrappere = ({ group }: { group: DropdownMenuGroupProps[] }) => {
    return (
        <>
            {group.map((item) => (
                <div key={item.id}>
                    <DropdownMenuItem className="dark:text-white header__nav__dropdown__item" onClick={item.cb}>
                        {
                            // React.createElement(item.icon, { className: 'icon' })
                        }
                        {item.title}
                        <DropdownMenuShortcut>{item.command}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </div>
            ))}
        </>
    )
}

const DropDownMenuWrapper: React.FC<DropDownMenuWrapperType> = ({ data, isCollapsed }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {isCollapsed ? (
                    <Button
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'header__nav__link collabsed ghost-button',
                        )}
                    >
                        <data.icon className="icon" />
                        <span className="sr-only">{data.title}</span>
                    </Button>
                ) : (
                    <Button
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'sm' }),
                            'header__nav__link menu-button ghost-button',
                            'justify-start',
                        )}
                    >
                        <data.icon className="icon icon-notcollabsed" />
                        {data.title}
                        {data.label && <span className={cn('ml-auto')}>{data.label}</span>}
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="header__nav__dropdown">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuGroupWrappere group={menuData.first} />
                    <DropdownMenuSeparator />
                    <DropdownMenuGroupWrappere group={menuData.second} />
                    <DropdownMenuSeparator />
                    <DropdownMenuGroupWrappere group={menuData.third} />
                    <DropdownMenuSeparator />
                    <DropdownMenuGroupWrappere group={menuData.fourth} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { DropDownMenuWrapper }
