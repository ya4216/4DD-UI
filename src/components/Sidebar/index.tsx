import React from 'react'
import { useSelector } from 'react-redux';
import customAxios from '../../common/CustomAxios';
import { RootState } from '../../modules';
// import SidebarItem from './SidebarItem'

type tProps = {
  code : string
}

const SidebarItem = ({ item, depth = 0 } : any) => {
  if(!item) return <></>;
  return (
    <div>
      <div style={{paddingLeft: depth * 20}}>[{depth}]{item.title}</div>
      <div>
        {item.children.map((child : any, index : number) => (
          <SidebarItem item={child} depth={depth + 1} key={index}/>
        ))}
      </div>
    </div>
  )
}

const Sidebar = (props : tProps) => {
  
  const list : any[] = new Array(customAxios({url:`/api/unit/title/${props.code}`, method:'get'}));
  
  console.log("listlistlistlist : ", list);

  // const list = useSelector((state: RootState) => state.unit.title).reduce((pre, cur, idx) => {
  //   return idx > 1 && cur ? pre.concat(cur) : pre;
  // }, []);
  // console.log("list~~~ : ", list);

  return (
    <div>
      {
        // for(let i in list){
        //   return (
        //     <SidebarItem item={subItem} key={index} />
        //   )
        // }

        list.map((subItem : any, index : number) => {
          console.log("fff : ", subItem);
          // return null;
            return (
              <SidebarItem item={subItem} key={index} />
            )
          }
        )
      }
    </div>
  )
}

export default Sidebar