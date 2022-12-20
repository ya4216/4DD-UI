import React from 'react'

const SidebarItem = ({ item } : any) => {
  return (
    <div>
      <div>{item.menuNm}</div>
      <div>
        {item.childrens.map((child : any) => (
          <SidebarItem item={child} />
        ))}
      </div>
    </div>
  )
}

export default SidebarItem