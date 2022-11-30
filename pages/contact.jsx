import Head from "next/head";
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from "next/router";
import { Container, Image, Row } from "react-bootstrap";
import React from "react";

export default function ContactPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Lucky Number</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <Row className=" g-4">
          <div className="col-sm-6 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4"> ข้อมูลติดต่อ </h6>
              <form>

             
                <div className="mb-3">
                  <label for=" titleName " className="form-label">
                    ชื่อของร้าน
                  </label>
                  <input type="text"className="form-control" placeholder="Lucky Number" />    
                </div>
                  

                  <div className="mb-3">
                  <label for="address" className="form-label">
                    ที่อยู่ติดต่อ
                  </label>
                  <input type="text" className="form-control" placeholder=" 44/4 "/>
                  </div>

                  <div className="mb-3">
                    <label for="opentime" className="form-label">
                      เวลาทำการ
                    </label>
                    <input type="text" className="form-control" placeholder="11.00-00.00 "/>
                  </div>

                  <div className="mb-3">
                    <label for="tel" className="form-label">
                      เบอร์โทรศัพท์
                    </label>
                    <input type="tel" className="form-control" placeholder="065-065-8538" />
                  </div>

                  <div className="mb-3">
                    <label for="line" className="form-label">
                      ไลน์
                    </label>
                    <input type="text" className="form-control" placeholder="@LuckyNumber" />
                  </div>

                <button
                  variant="success"
                  onClick={() => {
                    executeContactPut({
                      url: "/api/Contact" + contact.id,
                      method: "PUT",
                      data: {
                        titleName: titleName,
                        address: address,
                        tel: tel,
                        opentime: opentime,
                        line: line,
                        titleOpenDate: titleOpenDate,
                      },
                    }).then(() => {
                      Promise.all([
                        settitleName(""),
                        setAddress(""),
                        setTel(""),
                        setOpentime(""),
                        setLine(""),
                        setTitleOpenDate(""),
                        getContact(""),
                      ]).then(() => {
                        closeModal()
                      });
                    });
                  }}>
                      บันทึก
                  </button>

              </form>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
ContactPage.layout = IndexPage;
