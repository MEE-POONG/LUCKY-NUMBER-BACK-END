
import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useAxios from 'axios-hooks'


export default function LockNumderPage() {
    const [{ data: locknumderData }, getLocknumder] = useAxios({ url: '/api/locknumder' })

    const [{ data: postData, error: errorMessage, loading: locknumderLoading }, executeLocknumder] = useAxios({ url: '/api/locknumder', method: 'POST' }, { manual: true });
  
    const [{ data: locknumderById , loading: locknumderByIdLoading , error: locknumderByIdError},getLocknumderById] = useAxios({},{ manual: true } )
    
    const [{ loading: updateLocknumderLoading, error: updateLocknumderError }, executeLocknumderPut] = useAxios({},{manual: true})
  
    const [{loading: deleteLocknumderLoading , error: deleteLocknumderError},executeLocknumderDelete]= useAxios({},{manual: true})
  
    const [name, setName] = useState('');
   
    
    useEffect(()=>{
      setName(locknumderById?.name)
    
    },[locknumderById])
  
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
  
    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = async (id) => { 
     await getLocknumderById({url: '/api/locknumder/'+id,method:'GET'});
      setShowModalEdit(true);
     }
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };
  
    if ( locknumderLoading || locknumderByIdLoading || updateLocknumderLoading ||deleteLocknumderLoading) return <p>Loading...</p>
    if (errorMessage || locknumderByIdError || updateLocknumderError ||deleteLocknumderError) return <p>Error!</p>



  
  return (
    <>
      <Head>
        <title>Pig Jungle</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 w-m-max me-2">เลขอั้น</h5>
            <Button variant="success" onClick={ShowModalCreate}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">
                <thead>
                  <tr>
                    <th>เพิ่มเลขอั้น
                        
                    </th>
                   <th>จัดการ </th>
                  </tr>
                </thead>
                <tbody>
                  {locknumderData?.map((locknumder,index) => (
                     <tr key={index}>
                    <td>{locknumder.name}</td>
                   
                    <td>
                    <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(locknumder.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2" onClick={()=> executeLocknumderDelete({
                                                url: '/api/locknumder/'+locknumder.id,
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
                    <Modal.Title>เพิ่มประเภทหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ ประเภทหวย</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeLocknumder({
                            data: {
                                name:name,
                               
                            }
                        }).then(() => {
                            Promise.all([
                              setName(''),
                              
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
                    <Modal.Title>เพิ่มประเภทหวย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
              
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อ ประเภทหวย</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>

                    
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {
                        executeLocknumderPut({
                            url: '/api/locknumder/' + locknumderById?.id,
                            method: 'PUT',
                            data: {
                              name: name,
                             
                            }
                          }).then(() => {
                            Promise.all([
                              setName(''),
                             
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>


     

    
    </>
  );
}
LockNumderPage.layout = IndexPage;