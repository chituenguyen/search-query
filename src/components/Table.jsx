import {  Table } from 'antd';
// eslint-disable-next-line react/prop-types
const TableComponent = ({data}) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
  ];
  return <Table dataSource={data} columns={columns} pagination={false} />;
};

export default TableComponent;