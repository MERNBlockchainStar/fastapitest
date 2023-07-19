import React, { useState, useContext } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../context/datacontext";
import { SchemaContext } from "../context/schemacontext";
import fetchData from "../utils/fetchdata";

interface SmartFormProps {
  topic: string;
  formType: string;
  rawData: any;
}

const SmartForm = ({ topic, formType, rawData }: SmartFormProps) => {
  const { dataList, setDataList } = useContext(DataContext);
  const { schema } = useContext(SchemaContext);
  const [editData, setEditData] = useState<any[]>([]);

  const navigate = useNavigate();

  const editable = schema.hasOwnProperty("required") ? schema.required : [];

  useState(() => {
    const data = dataList.filter((data) => {
      return data.id == rawData;
    });

    if (formType === "update") {
      if (data.length) {
        const editData = Object.entries(data[0]).map(([Property, Value]) => ({
          id: rawData,
          Property,
          Value,
        }));
        setEditData(editData);
      }
    } else {
      if (schema.hasOwnProperty("required")) {
        const keys = schema.required;
        if (schema.hasOwnProperty("properties")) {
          const properties = schema.properties;
          const editData = keys.map((key) => {
            let value = "";
            if (properties.hasOwnProperty(key)) {
              if (properties[key].hasOwnProperty("default")) {
                value = properties[key].default;
              }
            }
            return {
              Property: key,
              Value: value,
            };
          });

          setEditData(editData);
        }
      }
    }
  }, [formType]);

  const columns = [
    { title: "Property", dataIndex: "Property", key: "Property" },
    {
      title: "Value",
      dataIndex: "Value",
      key: "Value",
      render: (text: string, record: any) => renderValueField(record),
    },
  ];

  const renderValueField = (record: any) => {
    const isEditable = editable.includes(record.Property);

    if (isEditable) {
      return (
        <input
          type="text"
          value={record.Value}
          onChange={(e) => handleValueChange(e.target.value, record)}
        />
      );
    }

    return record.Value;
  };

  const handleValueChange = (value: string, record: any) => {
    // Update the value in the editData state based on the record's ID
    const updatedEditData = editData.map((item) =>
      item.Property === record.Property ? { ...item, Value: value } : item
    );

    setEditData(updatedEditData);
  };

  const handleSaveClick = () => {
    const temp = {};
    let commitData = {};
    let error = false;
    editData.forEach((item) => {
        if(item.Value === '') {
            error = true;
        }
        if(editable.includes(item.Property)) {
            commitData[item.Property] = item.Value;
        }
      temp[item.Property] = item.Value;
    });

    if(error) {
        return;
    }
    // Update the original data list with the updated values from editData
    const updatedDataList = dataList.map((dataItem) => {
      if (dataItem.id === temp.id) {
        return temp;
      }
      return dataItem;
    });

    setDataList(updatedDataList);

    if (formType === "update") {
        fetchData({
            endpoint: `/machine/update/${temp.id}`,
            method: "PUT",
            data: commitData
        })
    } else {
        console.log(commitData);

        fetchData({
            endpoint: "/machine/create",
            method: "POST",
            data: commitData
        })
    }

    navigate("/");
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <>
      <Table dataSource={editData} columns={columns} pagination={false} />
      <div>
        <Button type="primary" onClick={handleSaveClick}>
          Save
        </Button>
        <Button style={{ marginLeft: "8px" }} onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default SmartForm;
