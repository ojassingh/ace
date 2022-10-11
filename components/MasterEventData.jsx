import "antd/dist/antd.css";
import { useState } from "react";
import { CSVLink } from "react-csv";
import {Table} from 'antd';
import {Tabs} from 'antd';
import SubEventData from "./SubEventData";

const MasterEventData = (props) => {

      const items = [];
      props.eventList.map((event, i)=>{
                items.push(
                    { label: event.name, key: i.toString(), children: <SubEventData event={event} userList={props.userList}/> }
                )
    })

      return(<div className="m-10">
        <Tabs items={items}/>
  </div>)
}

export default MasterEventData;