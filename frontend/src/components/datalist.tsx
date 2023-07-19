import React, { useContext } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../context/datacontext";
import { DataItem } from "../types/datatypes";

const DataList = () => {
  const { dataList } = useContext(DataContext);
  const navigate = useNavigate();

  const columns = dataList.length
    ? [
        ...Object.keys(dataList[0]).map((field) => ({
          title: field,
          dataIndex: field,
          key: field,
        })),
        {
          title: "Actions",
          key: "actions",
          render: (_: any, record: DataItem) => (
            <Button type="primary" onClick={() => handleEdit(record.id)}>
              Edit
            </Button>
          ),
        },
      ]
    : [];

  const handleEdit = (id: number) => {
    // Handle edit action, e.g., navigate to edit page
    console.log("Edit ID:", id);

    navigate(`/edit/${id}`);
  };

  const handleCreateClick = () => {
    navigate('/create');
  }

  return (
    <>
      <Table dataSource={dataList} columns={columns} key={columns}/>
      <Button type="primary" onClick={handleCreateClick}>Create</Button>
    </>
  );
};

export default DataList;
