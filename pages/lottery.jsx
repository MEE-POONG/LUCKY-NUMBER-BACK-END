import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'


export default function LotteryPage() {

  const [{ data: lotteryData }, getLottery] = useAxios({ url: '/api/lottery' }) 
  const [{data: lottotypeData}, getLottotype] = useAxios({ url: '/api/lottotype' })

  const [{ data: postData, error: errorMessage, loading: lotteryLoading }, executeLottery] = useAxios({ url: '/api/lottery', method: 'POST' }, { manual: true });

  const [{ data: lotteryById , loading: lotteryByIdLoading , error: lotteryByIdError},getLotteryById] = useAxios({},{ manual: true } )
  
  const [{ loading: updateLotteryLoading, error: updateLotteryError }, executeLotteryPut] = useAxios({},{manual: true})

  const [{loading: deleteLotteryLoading , error: deleteLotteryError},executeLotteryDelete]= useAxios({},{manual: true})

  const [numberlotto, setNumberlotto] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  
  useEffect(()=>{
    setNumberlotto(creditById?.numberlotto)
    setPrice(creditById?.price)
    setType(creditById?.lotteryId)
  },[lotteryById])

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalCreate = () => setShowModalCreate(true);
  const ShowModalEdit = async (id) => { 
   await getLotteryById({url: '/api/lottery/'+id,method:'GET'});
    setShowModalEdit(true);
   }
  const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };


  return (
    < >
      <Head>
        <title>Lucky Number</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">ชื่อผู้ใช้</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                <thead>
                  <tr>
                    <th >เลขหวย</th>
                    <th >ราคา</th>
                    <th >ประเภท</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {lotteryData?.map((lottery,index) => (
                     <tr key={index}>
                    <td>{lottery.addcredit}</td>
                    <td>{lottery.amount}</td>
                    <td>{lottery?.user?.username}</td>
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(lottery.id)}><FaEdit/></a>
                                        <a className="btn btn-sm btn-danger me-2" onClick={()=> executeLotteryDelete({
                                                url: '/api/lottery/'+lottery.id,
                                                method: 'DELETE'

                                            })}><FaTrash /></a>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>

      <Modal show={creditLoading || creditByIdLoading || updateCreditLoading ||deleteCreditLoading}>
        <Modal.Body className='text-center'>Lodeing........</Modal.Body>
      </Modal>

      <Modal  show={errorMessage || creditByIdError || updateCreditError ||deleteCreditError} >
        <Modal.Body className='text-center'>Error........</Modal.Body>
      </Modal>

      <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formFile" className="mb-3">
                    <Form.Select value={username} onChange={event => setUserName(event.target.value)}>
                            <option value="">username</option>
                            {userData?.map((user, index) => (
                                <option key={index} value={user.id}>{user.username}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit เข้า</Form.Label>
                        <Form.Control type="number" value={addcredit} onChange={event => setAddCredit(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit ทั้งหมด</Form.Label>
                        <Form.Control type="number" value={amount} onChange={event => setAmount(event.target.value)} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeCredit({
                            data: {                        
                                userId:username,
                                addcredit:addcredit,
                                amount:amount,
                            }
                        }).then(() => {
                            CloseModal()
                            Promise.all([
                              setUserName(''),
                              setAddCredit(''),
                              setAmount(''),
                              getCredit(),
                              getUsers(),
                            ])
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
            <Modal.Header closeButton >
                    <Modal.Title>เพิ่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Select value={username} onChange={event => setUserName(event.target.value)}  >
                            <option value="">username</option>
                            {userData?.map((user, index) => (
                                <option key={index} value={user.id}>{user.username}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit เข้า</Form.Label>
                        <Form.Control type="number" value={addcredit} onChange={event => setAddCredit(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit ทั้งหมด</Form.Label>
                        <Form.Control type="number" value={amount} onChange={event => setAmount(event.target.value)} />
                    </Form.Group>
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeCreditPut({
                            url: '/api/credit/' + creditById?.id,
                            method: 'PUT',
                            data: {
                                userId:username,
                                addcredit:addcredit,
                                amount:amount,
                            }
                          }).then(() => {
                            Promise.all([
                                setUserName(''),
                                setAddCredit(''),
                                setAmount(''),
                                getCredit(),
                                getUsers(),
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>

            

    </ >
  );
}
LotteryPage.layout = IndexPage;