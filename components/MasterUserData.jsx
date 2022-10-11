import "antd/dist/antd.css";
import { useState } from "react";
import { CSVLink } from "react-csv";
import {Table} from 'antd';


const MasterUserData = (props) => {

    const [csvData, setData] = useState(props.list)
    
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
        Table.SELECTION_ALL,
        ],
    };


    const dataSource = props.list;
    // console.log(dataSource)

    const columns = [
        {
          title: 'NAME',
          dataIndex: 'displayName',
          sorter: (a, b) => a.age - b.age,
          width: '20%',
        //   key: 'displayName',
        },
        {
          title: 'USER TYPE',
          dataIndex: 'userType',
        //   key: 'userType',
            filters: [
                {
                    text: 'admin',
                    value: 'admin'
                },
                {
                    text: 'guest',
                    value: 'guest'
                },

            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.userType.startsWith(value),
            width: '20%',
        },
        {
          title: 'MEMBER TYPE',
          dataIndex: 'memberType',
        //   key: 'memberType',
            filters: [
                {
                    text: 'general',
                    value: 'general'
                },
                {
                    text: 'regular',
                    value: 'regular'
                },

            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.memberType.startsWith(value),
            width: '20%',
        },
        {
            title: 'STUDENT NUMBER',
            dataIndex: 'studentNumber',
            // key: 'studentNumber',
            width: '20%',
          },
          {
            title: 'CONTACT',
            dataIndex: 'email',
            // key: 'email',
            width: '20%',
          },
      ];


      return(<div className="m-10">
      <div className="flex">
          <h1 className="font-semibold text-4xl">User Data Collection</h1>
          <div>
              <CSVLink filename="AceUTSC_Users.csv" data={csvData} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-4 w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                  </svg>
              </CSVLink>
          </div>
      </div>
      <div className="rounded-lg drop-shadow-xl">
          <Table rowKey={record => record.id} rowSelection={rowSelection} dataSource={dataSource} columns={columns}/>
      </div>
  </div>)
}

export default MasterUserData;