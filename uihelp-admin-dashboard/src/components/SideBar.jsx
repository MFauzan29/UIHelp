import React, { useEffect, useState } from 'react'
import openclose from '../assets/openclose.svg'
import arrow from '../assets/arrow.svg'
import map from '../assets/map.png'
import manage from '../assets/manage.png'
import statistic from '../assets/statistic.png'
import logout_icon from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {

    const navigate = useNavigate()

    const menus = [
        {
            logo: map,
            name: "View Map",
            url: `/view-map`
        },
        {
            logo: manage,
            name: "Manage Reports",
            url: `/manage-reports`
        },
        {
            logo: statistic,
            name: "Statistics",
            url: `/statistics`
        },
    ]

    const movePage = (menuUrl) => {
        navigate(menuUrl, {
            // state: {

            // }
        })
    }

    const [expanded, setExpanded] = useState(false)

    return (
        <div
            id='sidebar'
            className={`min-h-screen fixed z-20 top-0 left-0 transition-all duration-300 lg:relative lg:flex lg:flex-col gap-10 space-y-8 border lg:space-y-0 rounded-r-2xl lg:rounded-r-3xl bg-white pt-10 ${expanded ? 'w-64' : 'w-12'}`}
        >

            <div id='logo' className={`w-full flex justify-center lg:px-0 ${expanded && "px-5 justify-between lg:gap-10"} transition-all duration-300`}>
                <div className={`flex items-center lg:justify-center overflow-hidden duration-300 transition-all ${expanded ? "w-fit lg:w-52" : "w-0"}`}>
                    <div className='leading-7 bg-slate-100 border-2 border-slate-300 p-2 rounded-lg'>
                        <p className='text-start text-xl lg:text-2xl font-bold'>UIHelp</p>
                        <p className='text-base lg:text-xl'>Admin Dashboard</p>
                    </div>
                </div>
                <img src={openclose} onClick={() => setExpanded((curr) => !curr)} className='lg:hidden' alt="" />
            </div>
            <div className='bg-light h-[0.05rem] w-full'></div>
            <div id='menus' className={`flex flex-col justify-between items-center gap-5 w-full h-full px-2 lg:px-4 ${expanded && "px-2"} transition-all duration-300`}>
                <div className='flex flex-col gap-5 w-full px-2 '>
                    {
                        menus.map((menu, i) => (
                            <div key={i} className='flex justify-between items-center duration-200 cursor-pointer opacity-50 hover:opacity-100' onClick={() => movePage(menu.url)}>
                                <div className='flex items-center gap-2 transition-all duration-300'>
                                    <img src={menu.logo} className='w-5 h-5' alt="" />
                                    <p className={`text-light text-base lg:text-lg transition-all duration-300 ${expanded ? "" : "hidden"}`}>{menu.name}</p>
                                </div>
                                {
                                    expanded && <img src={arrow} className='transition-all duration-300' alt="" />
                                }
                            </div>
                        ))
                    }
                </div>
                <div onClick={() => navigate("/")} className='absolute flex gap-2 bottom-6 duration-300 cursor-pointer mb-40 lg:mb-10'>
                    <img src={logout_icon} className='scale-90 lg:scale-100' alt="" />
                    <p className={`text-danger text-base lg:text-lg transition-all duration-300 ${!expanded && "hidden"}`}>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar