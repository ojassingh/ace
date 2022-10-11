import "antd/dist/antd.css";
import { Fragment, useState } from "react";
import { CSVLink } from "react-csv";
import {Table} from 'antd';
import Footer from "./Footer";
import {Tabs} from 'antd'
import MasterUserData from "./MasterUserData";
import MasterEventData from "./MasterEventData";

const MasterData = (props) => {

    const items = [
        { label: 'Users', key: 'users', children: <MasterUserData list={props.userList}/> }, // remember to pass the key prop
        { label: 'Events', key: 'events', children: <MasterEventData userList={props.userList} eventList={props.eventList} /> },
      ];

    return(
        <Fragment>
            <div className="mx-10">
                <Tabs items={items} />;
        </div>
        <div className="mt-24">
            <Footer/>
        </div>
        </Fragment>
    )
}

export default MasterData;
