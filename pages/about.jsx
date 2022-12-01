import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';
import useAxios from 'axios-hooks';

export default function AboutPage() {

    const [{data: aboutData}] = useAxios({url: '/api/about'})
    const [{ data: aboutById , loading: aboutByIdLoading , error: aboutByIdError},getAboutById] = useAxios({},{ manual: true } )
    const [{ loading: updateAboutLoading, error: updateAboutError }, executeAboutPut] = useAxios({},{manual: true})



    // ----ing-----
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    const [title, SetTitle] = useState('');
    const [subtitle, SetSubtitle] = useState('');
    const [detail, SetDetail] = useState('');
    const [img, setImg] = useState('');

   useEffect(() =>{
    SetTitle(aboutById?.title)
   })

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageProductChange = (e) => {
        setImage([...e.target.files])
    }

    if (aboutByIdLoading || updateAboutLoading) return <p>Loading...</p>
    if (aboutByIdError || updateAboutError) return <p>Error!</p>
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
                <Row className=" g-4">

                    <div className="bg-secondary rounded p-4">

                        <h6 className="mb-4"> ข้อมูลร้าน </h6>
                        <form>
                            <div className="mb-3">
                                <label for="Inputname" className="form-label">รูปภาพของร้าน</label><br />
                                {imageURL.map(imageSrcProduct => <Image className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                <input type="file" accept="image/*" onChange={onImageProductChange} className="form-control" id="#" placeholder='' />
                                <br />
                                    <div className="mb-3">
                                        <label for="Inputphone" className="form-label">หัวข้อหลัก</label>
                                        <input type="tel" className="form-control" style={{ width: "500px" }} id="# " placeholder='Lucky Number' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="Inputphone" className="form-label">หัวข้อหลัก</label>
                                        <input type="tel" className="form-control" style={{ width: "500px" }} id="# " placeholder='Lucky Number' />
                                    </div>

                                <div className="mb-3">
                                    <label for="Inputphone" className="form-label">รายละเอียดร้าน</label>
                                    <Editor/>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success"  >ยืนยัน</button>
                        </form>
                    </div>
                </Row>


            </Container>
        </ >
    );
}
AboutPage.layout = IndexPage;