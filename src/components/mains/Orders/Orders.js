import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Collapse, Space, Progress, Button} from 'antd';
import moment from 'moment';
import 'moment/locale/th';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const { Panel } = Collapse;
    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
            color: '#1677ff',
          }}
          spin
        />
      );

    const success = (<Progress type="circle" style={{fontSize: 24,color: '#1677ff',}} percent={100} width={80} />);
    const cancel = (<Progress type="circle" style={{fontSize: 24,color: '#1677ff',}} percent={80} width={80} status="exception" />);

    const SCO = "COMPLETED"
    const SCA = "CANCEL"

    const tranSuccess = async (status,_id) => {
    
        if (window.confirm("Are you sure you want to do this?")) {
            await axios.post(
                "http://localhost:3001/private/api/v1/order/update",
                {status,_id},
                {
                  headers: {
                  //   "content-type": "multipart/form-data",
                    Authorization: 'Bearer ' + token,
                  },
                }
              );

        }

        window.location.reload();
      };

    const App = () => <Spin indicator={antIcon} />;

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                const res = await axios.get('http://localhost:3001/private/api/v1/order/getorders', {
                    headers: {Authorization: 'Bearer ' + token}
                })
                console.log(res)
                setHistory(res.data.result)
                
            }
            getHistory()
        }
    },[token, setHistory])

    console.log(history)
    
    return (
        <div className='Orders-page'>
            <div className='tie-t'>
                <h3>Orders</h3>
            </div>
            { history === null ? null : history.map(e => (
                <div className='Orders-page'>
                <Space direction="vertical">
                    <Collapse collapsible="header" defaultActiveKey={e._id}>
                    <div className="spin-ez">{e.status === 'PROCESS'?antIcon:'null'} {e.status === 'PROCESS'?' In Process':' '}</div>
                    
                    <Panel header={moment(e.create_at_date).startOf('min').fromNow() + ''}  icon={antIcon} key={e.id}>
                        <div className="contain-list">
                            <div className="list-ez">
                                {e.order === null? null : e.order.map(x => (
                                    <div className='open-listez'>
                                        <div className="box-image">
                                            <img src={x.image} alt="" />
                                        </div>
                                        <div className='list-disez'>
                                            <h2>{x.name}</h2>
                                            <p>{x.price} THB x {x.quantity} </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="total-lists">
                                <h3>Total: {e.total} THB</h3>
                                {isAdmin && <div className="update-order">
                                        <Button type="primary" ghost onClick={() => tranSuccess(SCO,e._id)}>COMPLETED</Button>
                                        <Button type="primary" danger ghost onClick={() => tranSuccess(SCA,e._id)}>CANCEL</Button>
                                    </div>
                                }
                            </div>
                        </div>
                        
                    </Panel>
                    </Collapse>
                </Space>
                </div>
            ))
            }
        </div>
    )
}

export default OrderHistory

