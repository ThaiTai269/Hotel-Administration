import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridColumns, GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { BarStackHorizontal } from "@visx/shape";
import { Button, Select, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import React, { useEffect, useState } from "react";
import { DataActual } from "../../data/DataActual";
import {
  IDataActual,
  IDataBar,
  MultiChoiceHotel,
} from "../../interface/IActualData";
import "./ActualData.css";
import BarChart from "./BarChart";

const options: MultiChoiceHotel[] = [
  { key: "ALL", value: "Sokha Hotels & Resorts" },
  { key: "SPH", value: "Sokha Phnom Penh Hotel" },
  { key: "PP02", value: "Sokha Phnom Penh Residence" },
  { key: "SR01", value: "Sokha Angkor Resort (Luxury)" },
  { key: "SR02", value: "Sokha Siem Reap Resort & Convention Center" },
  { key: "SR03", value: "Sokha Palace Siem Reap Hotel (Comfort)" },
  { key: "SR04", value: "Sokha Private Mansion (Villas)" },
  { key: "SV01", value: "Sokha Beach Resort" },
  { key: "SV02", value: "Sokha Bayview by Sokha Beach Resort" },
  { key: "SV03", value: "Lakeside by Sokha Beach Resort" },
  { key: "SV04", value: "Moha Mohori by Sokha Beach Resort" },
  { key: "KP01", value: "Thansur Sokha Hotel" },
  { key: "KP02", value: "Le Bokor Palace" },
];
const DataDefault: IDataActual[] = DataActual;

export const ActualData: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<IDataActual[]>(DataDefault);
  // Select
  const handleChange = (value: string[]) => {
    // console.log(`Selected: ${value}`);
    setSelected(value);
  };
  // console.log(data);
  const handleOnSubmitOptions = () => {
    const dataOption = DataDefault.filter((item) =>
      selected.includes(item.HotelName)
    );
    // console.log(dataOption);
    setData(dataOption);
  };
  const handleClearOptions = () => {
    setSelected([]);
    setData(DataDefault);
  };
  // end Select
  useEffect(() => {
    handleClearOptions();
  }, []);
  return (
    <>
      <div className="flex items-center">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            mode="multiple"
            placeholder="Please select Hotel"
            defaultValue={[]}
            onChange={handleChange}
            style={{ width: "100%" }}
            options={options}
            allowClear
            onClear={handleClearOptions}
          />
        </Space>
        <Button
          type="default"
          className="ml-4  bg-[#1677FF] text-white"
          onClick={handleOnSubmitOptions}
        >
          Submit
        </Button>
      </div>
      <div className="mt-2">
        <Table
          dataSource={data}
          scroll={{ x: 1300 }}
          bordered={true}
          pagination={{ pageSize: 3 }}
          size="small"
        >
          <Column
            title="Hotel Name"
            dataIndex="HotelName"
            key="HotelName"
            fixed="left"
            width={"300px"}
          />
          <Column
            title="Property Code"
            dataIndex="id"
            key="id"
            width={"160px"}
          />

          <Column
            title="Total Room in Hotel"
            dataIndex="RoomTotal"
            key="RoomTotal"
            width={"200px"}
          />
          <Column
            title="Room Revenue"
            dataIndex="RoomRevenue"
            key="RoomRevenue"
            width={"200px"}
          />
          <Column
            title="F&B Revenue"
            dataIndex="FoodRevenue"
            key="FoodRevenue"
            width={"200px"}
          />
          <Column
            title="Other Revenue"
            dataIndex="OtherRevenue"
            key="OtherRevenue"
            width={"200px"}
          />
          <Column
            title="Total Revenue"
            dataIndex="TotalRevenue"
            key="TotalRevenue"
            width={"200px"}
          />
          <Column title="Occ %" dataIndex="occ" key="occ" width={"200px"} />
          <Column title="ADR" dataIndex="adr" key="adr" width={"200px"} />
          <Column
            title="Hotel Room"
            dataIndex="HotelRoom"
            key="HotelRoom"
            width={"200px"}
          />
          <Column
            title="Available Rooms"
            dataIndex="AvailableRoom"
            key="AvailableRoom"
            width={"200px"}
          />
          <ColumnGroup title={<span className="">REV</span>}>
            <Column
              title="Occupied Room"
              key="OccupiedRoom"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span className="text-center">{record.Rev.OccupiedRoom}</span>
              )}
            />
            <Column
              title="Group Rooms"
              key="GroupRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.Rev.GroupRoom}</span>
              )}
            />
            <Column
              title="Transient Rooms"
              key="TransientRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.Rev.TransientRoom}</span>
              )}
            />
          </ColumnGroup>
          <ColumnGroup title="Rn" className="custom-column-group">
            <Column
              title="Occupied Room"
              dataIndex="OccupiedRoom"
              key="OccupiedRoom"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.RN.OccupiedRoom}</span>
              )}
            />
            <Column
              title="Group Rooms"
              dataIndex="GroupRoom"
              key="GroupRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.RN.GroupRoom}</span>
              )}
            />
            <Column
              title="Transient Rooms"
              dataIndex="TransientRoom"
              key="TransientRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.RN.TransientRoom}</span>
              )}
            />
          </ColumnGroup>
          <ColumnGroup title="OCC (%)">
            <Column
              title="Occupied Room"
              dataIndex="OccupiedRoom"
              key="OccupiedRoom"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.OCC.OccupiedRoom}</span>
              )}
            />
            <Column
              title="Group Rooms"
              dataIndex="GroupRoom"
              key="GroupRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.OCC.GroupRoom}</span>
              )}
            />
            <Column
              title="Transient Rooms"
              dataIndex="TransientRoom"
              key="TransientRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.OCC.TransientRoom}</span>
              )}
            />
          </ColumnGroup>
          <ColumnGroup title="ADR ($)">
            <Column
              title="Occupied Room"
              dataIndex="OccupiedRoom"
              key="OccupiedRoom"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.ADR.OccupiedRoom}</span>
              )}
            />
            <Column
              title="Group Rooms"
              dataIndex="GroupRoom"
              key="GroupRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.ADR.GroupRoom}</span>
              )}
            />
            <Column
              title="Transient Rooms"
              dataIndex="TransientRoom"
              key="TransientRooms"
              width={"200px"}
              render={(text, record: IDataActual) => (
                <span>{record.ADR.TransientRoom}</span>
              )}
            />
          </ColumnGroup>
        </Table>
      </div>
      <div>
        <BarChart width={900} height={200} data={data} />
      </div>
    </>
  );
};
