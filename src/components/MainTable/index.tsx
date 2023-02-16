import { ProColumns, ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import { Col, ConfigProvider, Rate, Row, Typography } from "antd";
import enUS from "antd/es/locale/en_US";
import axios from "axios";
import moment from "moment";
import { StarOutlined } from "@ant-design/icons";
import './index.css';
const { Title } = Typography;

export default function Table() {

  const [lastGameDate, setLastGameDate] = useState<string | undefined>(undefined)

  const columns:ProColumns[]  = [
    {
      title: "Player",
      dataIndex: "player",
      valueType: "text",
      sorter: (a:any, b:any) => a.player.localeCompare(b.player)
      ,
      render: (_:any, record: any) => {
        return<> <a style={record.excellent ? {color:"gold", fontSize:16.5} : {}} href="/blabla" >{record.player}</a> {record.excellent && <StarOutlined style={{fontSize:19, color: 'gold'}} />}</>
      }
    },
    {
      title: "Games",
      dataIndex: "games",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.games - b.games

    },
    {
      title: "Wins",
      dataIndex: "wins",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.wins - b.wins
    },
    {
      title: "Draws",
      dataIndex: "draws",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.draws - b.draws
    },
    {
      title: "Losses",
      dataIndex: "losses",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.losses - b.losses

    },
    {
      title: "Goals",
      dataIndex: "goals",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.goals - b.goals

    },
    {
      title: "Assists",
      dataIndex: "assists",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.assists - b.assists

    },
    {
      title: "Score",
      dataIndex: "score",
      valueType: "digit",
      hideInSearch: true,
      sorter: (a:any, b:any) => a.score - b.score,

      render:(_:any, record: any) => {
        return <span>
        <Rate allowHalf disabled defaultValue={record.score / 2}/> 
        <span className="ant-rate-text">{record.score}</span></span>
      }
    },
  ];

  const loadData = async (params: any) => {
    return await axios
      .get(`http://localhost:3001/api/dashboard/main-table?date=${moment().format("YYYY-MM-DD")}`, {
        headers: {"Authorization": `Bearer ${window.localStorage.getItem('token')}`}
      })
      .then((response) => {
        console.log(response);
        setLastGameDate(response.data.data.date)
        return {
          data: response.data.data.players,
          success: true,
          total: response.data.data.length,
        };
      });
  };
  const actionRef = useRef();
  return (
    <Row
      justify="space-around"
      align="middle"
    >
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} style={{marginTop: 20}} >
          <Title level={2} style={{textAlign: "center"}}>{lastGameDate}</Title>
      </Col>

      <Col xxl={14} xl={14} lg={16} md={24} sm={24} xs={24}>

    <ConfigProvider locale={enUS}>
      
      <ProTable
      style={{border: '15px solid #fcfcfc', borderRadius: "10px", backgroundColor: "#fcfcfc"}}
        request={loadData}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        size="small"
        options={{ reload: false, setting: false, density: false }}
        rowKey={"player_id"}
        pagination={
          {
            defaultPageSize:10,
          }
        }
      >
        Table
      </ProTable>
    </ConfigProvider>
    </Col>
    </Row>
  );
}
