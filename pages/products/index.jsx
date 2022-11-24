import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Button, Form, Image, InputGroup, Row, Col } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

export default function ProductPage() {

    const data = {
        products:[
            {
                id:"1",
                image:"images/user.jpg",
                name:"บ้อง",
                type:"อุปกรณ์",
                total:"60",
                price:"2000"
            },
            {
                id:"2",
                image:"images/user.jpg",
                name:"กัญกัญ",
                type:"กัญชา",
                total:"2500",
                price:"200"
            },
            {
                id:"2",
                image:"images/user.jpg",
                name:"Product 3",
                type:"Jhon Doe",
                total:"40",
                price:"200"
            }
        ]

    }

    // modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = () => setShowModalEdit(true);
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

    // image product
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageProductChange = (e) => {
        setImage([...e.target.files])
    }

    // image product other
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])

    useEffect(() => {
        if (images.length < 1) return

        const newImageUrls = []
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    }, [images])

    const onImageOtherChange = (e) => {
        setImages([...e.target.files])
    }

    return (
        <>
            <Container fluid className="pt-4 px-4">
                <div className="bg-secondary text-center rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">รายการสินค้า</h6>
                        <Button variant="success" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start table-striped align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">รูปภาพ</th>
                                    <th scope="col">ชื่อสินค้า</th>
                                    <th scope="col">ประเภทสินค้า</th>
                                    <th scope="col">จำนวนคงเหลือ</th>
                                    <th scope="col">ราคา</th>
                                    <th scope="col">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.map((p) =>(
                                    <tr>
                                    <td>
                                        <img className="rounded-circle flex-shrink-0" src={p.image} alt="" style={{ width: "40px", height: "40px" }} />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.type}</td>
                                    <td>{p.total} ชิ้น</td>
                                    <td>{p.price} บาท</td>
                                    <td>
                                        <a className="btn btn-sm btn-success me-2" onClick={ShowModalEdit}><FaEdit /></a>
                                        <a className="btn btn-sm btn-danger me-2" href=""><FaTrash /></a>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>

            {/* Create */}
            <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL.map(imageSrcProduct => <Image className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า เพิ่มเติม</Form.Label>
                        <Row>
                            <Col >
                                {imageURLs.map(imageSrc =>
                                    <Image className="mb-2 mx-2" style={{ height: 100 }} src={imageSrc} alt="product_img" fluid rounded />
                                )}
                            </Col>
                        </Row>
                        <Form.Control type="file" multiple accept="image/*" onChange={onImageOtherChange} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" defaultValue={""} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={""} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ประเภทสินค้า</Form.Label>
                        <Form.Select>
                            <option>ประเภทสินค้า</option>
                            <option value="1">อุปกรณ์</option>
                            <option value="2">กัญชา</option>
                            <option value="3">ของเสริม</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Label>จำนวนคงเหลือ</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control type="text" defaultValue={""} />
                        <Form.Select defaultValue="Choose...">
                            <option>หน่วยนับ</option>
                            <option>ชิ้น</option>
                            <option>กรัม</option>
                            <option>กิโลกรัม</option>
                        </Form.Select>
                    </InputGroup>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" defaultValue={""} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success">
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        <Image className="mb-2" style={{ height: 200 }} src={'https://pyxis.nymag.com/v1/imgs/995/fa8/85410a597ae40972b3839e1d0a1470e497-cannabis.rsquare.w700.jpg'} alt="product_img" fluid rounded />
                        <Form.Control type="file" accept="image/*" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า เพิ่มเติม</Form.Label>
                        <Image className="mb-2" src={'images/user.jpg'} alt="otherProductImage" fluid rounded />
                        <Form.Control type="file" multiple accept="image/*" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" defaultValue={"ชื่อสินค้า"} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={"รายละเอียดสินค้า"} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ประเภทสินค้า</Form.Label>
                        <Form.Select>
                            <option>ประเภทสินค้า</option>
                            <option value="1">อุปกรณ์</option>
                            <option value="2">กัญชา</option>
                            <option value="3">ของเสริม</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Label>จำนวนคงเหลือ</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control type="text" defaultValue={"250"} />
                        <Form.Select defaultValue="Choose...">
                            <option>หน่วยนับ</option>
                            <option>ชิ้น</option>
                            <option>กรัม</option>
                            <option>กิโลกรัม</option>
                        </Form.Select>
                    </InputGroup>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" defaultValue={"1250"} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success">
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
ProductPage.layout = IndexPage