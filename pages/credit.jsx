import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'

export default function TransferPage() {
  const [{ data: creditData }, getCredit] = useAxios({ url: '/api/credit' })
  const [{ data: userData }, getUsers] = useAxios({ url: '/api/user' })

  const [{ data: postData, error: errorMessage, loading: creditLoading }, executeCredit] = useAxios({ url: '/api/credit', method: 'POST' }, { manual: true });

  const [{ data: creditById , loading: creditByIdLoading , error: creditByIdError},getCreditById] = useAxios({},{ manual: true } )
  
  const [{ loading: updateCreditLoading, error: updateCreditError }, executeCreditPut] = useAxios({},{manual: true})

  const [{loading: deleteCreditLoading , error: deleteCreditError},executeCreditDelete]= useAxios({},{manual: true})

  const [username, setUserName] = useState('');
  const [addcredit, setAddCredit] = useState('');
  const [amount, setAmount] = useState('');

  
  useEffect(()=>{
    setUserName(creditById?.username)
    setAddCredit(creditById?.addcredit)
    setAmount(creditById?.amount)

  },[creditById])

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const ShowModalCreate = () => setShowModalCreate(true);
  const ShowModalEdit = async (id) => { 
   await getCreditById({url: '/api/credit'+id,method:'GET'});
    setShowModalEdit(true);
   }
  const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

  if ( creditLoading || creditByIdLoading || updateCreditLoading ||deleteCreditLoading) return <p>Loading...</p>
  if (errorMessage || creditByIdError || updateCreditError ||deleteCreditError) return <p>Error!</p>

  return (
    < >
      <Head>
        <title>Pig Jungle</title>
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
                    <th >username</th>
                    <th >credit เข้า</th>
                    <th >credit ทั้งหมด</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {creditData?.map((credit,index) => (
                     <tr key={index}>
                    <td>{credit?.user?.username}</td>
                    <td>{credit.addcredit}</td>
                    <td>{credit.amount}</td>
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(credit.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeCreditDelete({
                                                url: '/api/credit/'+credit.id,
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

      <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => setUserName(event.target.value)}  />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit เข้า</Form.Label>
                        <Form.Control type="text" value={addcredit} onChange={event => setAddCredit(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit ทั้งหมด</Form.Label>
                        <Form.Control type="text" value={amount} onChange={event => setAmount(event.target.value)} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeCredit({
                            data: {
                                userId:userID,
                                addcredit:addcredit,
                                amount:amount,
                            }
                        }).then(() => {
                            Promise.all([
                              setUserName(''),
                              setAddCredit(''),
                              setAmount(''),
                              getUser()
                            ]).then(() => {
                                CloseModal()
                            })
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
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => setUserName(event.target.value)} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit เข้า</Form.Label>
                        <Form.Control type="text" value={addcredit} onChange={event => setAddCredit(event.target.value)} />
                    </Form.Group>
                    
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>credit ทั้งหมด</Form.Label>
                        <Form.Control type="text" value={amount} onChange={event => setAmount(event.target.value)} />
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
                                username:username,
                                addcredit:addcredit,
                                amount:amount,
                            }
                          }).then(() => {
                            Promise.all([
                                setUserName(''),
                                setAddCredit(''),
                                setAmount(''),
                                getUser()
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
TransferPage.layout = IndexPage;