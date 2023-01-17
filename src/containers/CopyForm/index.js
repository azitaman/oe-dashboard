import React from 'react'
import { Form, Checkbox, Spin, Result, Select } from 'antd'
import { getDepthValue } from 'utils'
import * as queries from 'utils/queries'
import { useQuery } from '@apollo/react-hooks'
import './index.scss'

const CheckboxGroup = Checkbox.Group

const CopyForm = ({
  form: { getFieldDecorator, setFieldsValue },
  field,
  clientId,
  initialValue = {
    servers: [],
  },
  setCopyToItem,
  copyToItem
}) => {
  // const { loading, error, data: serverData } = useQuery(queries.groupingQuery, {
  //   variables: {
  //     type: '/Servers/',
  //     clientId,
  //   },
  // })
  const { loading, error, data: serverData } = useQuery(queries.groupingQuery, {
    variables: {
      type: '/'
    },
  })

  if (loading) {
    return (
      <div
        style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin tip="Loading..." />
      </div>
    )
  }

  if (error || !serverData || !serverData.grouping) {
    return <Result status="500" title="Something went wrong" />
  }

  const { grouping: servers } = serverData

  // const register = key => {
  //   getFieldDecorator(`${field}.${key}`, { initialValue: initialValue[key] })
  // }

  const update = (value) => {
    console.log("value:", value);
    setCopyToItem(value)
  }
  // console.log("item:", copyToItem);
  // register('servers')

  return (
    <div className="oz-form-copy">
      {servers && servers.length ? (
        <Form.Item label="Documents" className="primary-label">
          {/* {getFieldDecorator(`${field}.servers`)(<CheckboxGroup options={servers.map(server => ({ label: server.name, value: server.name }))} />)} */}
          <Select
            style={{ width: '100%' }}
            onChange={value => update(value)}
            value={copyToItem}
            placeholder="Please select an Document"
          >
            {servers.map(server => (
              <Select.Option value={server.name}>{server.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        ''
      )}
    </div>
  )
}

export default CopyForm
