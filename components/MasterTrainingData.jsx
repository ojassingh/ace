import "antd/dist/antd.css";
import { useState } from "react";
import { CSVLink } from "react-csv";
import {Table} from 'antd';
import {Tabs} from 'antd';
import SubSessionData from "./SubSessionData";

const MasterTrainingData = (props) => {


    // console.log(props.sessionList)

      const items = [];
      props.sessionList.map((session, i)=>{
                items.push(
                    { label: session.name, key: i.toString(), children: <SubSessionData session={session} userList={props.userList}/> }
                )
    })


      return(<div className="m-10">
        <Tabs items={items}/>
  </div>)
}

export default MasterTrainingData;