import React, { Component } from 'react'
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const cardDefaultImg = "https://i.pinimg.com/originals/fd/0c/b9/fd0cb97ac9aaa1341195b1c4ab58fb6f.png";
export class AlgoliaHit extends Component {
    render() {
        const { hit, selectThisCard } = this.props;
        return (
            <Col md="4" className="my-2">
                <Card className="shadow-sm flex-row">
                    <Card.Img src={hit.imageURLs.thumbnail} style={{ width: "133px" }} onError={(e)=> e.target.src = `${cardDefaultImg}`} />
                    <Card.Body>
                        <Card.Title style={{ fontSize: "1rem" }}>
                            <Link to={`/card/${hit.objectID}`} onClick={() => selectThisCard(hit)} >
                                {hit.name}
                            </Link>
                        </Card.Title>
                        {hit.atk || hit.def ? (
                            <div className="d-flex justify-content-between">
                                <span>
                                    {hit.atk}/{hit.def}
                                </span>
                                <span>
                                    {hit.type.lvl2
                                        ? hit.type.lvl2.substring(
                                            hit.type.lvl2.lastIndexOf(" ")
                                        )
                                        : hit.type.lvl0}
                                </span>
                            </div>
                        ) : (
                            <span>
                                {hit.type.lvl0}/{hit.race}
                            </span>
                        )}
                    </Card.Body>
                </Card>
            </Col>





            // <Card key={hit.objectID} className="shadow-sm mb-3 mx-auto" style={{ minWidth: "200px", maxWidth: "200px" }}>
            //     <div style={{
            //         height: "200px",
            //         backgroundImage: `url(${hit.imageURLs.full}), url('https://storage.cloud.google.com/yugiohdb-app.appspot.com/cards/default.jpg')`,
            //         backgroundRepeat: "none",
            //         backgroundSize: "cover",
            //     }}
            //     />
            //     <Card.ImgOverlay
            //         className="py-1 text-white"
            //         style={{
            //             backgroundColor: "rgba(0,0,0,0.5)",
            //             height: "2rem",
            //             top: "168px",
            //         }}
            //     >
            //         <div>
            //             {hit.atk || hit.def ? (
            //                 <div className="d-flex justify-content-between">
            //                     <span>
            //                         {hit.atk}/{hit.def}
            //                     </span>
            //                     <span>
            //                         {hit.type.lvl2
            //                             ? hit.type.lvl2.substring(
            //                                 hit.type.lvl2.lastIndexOf(" ")
            //                             )
            //                             : hit.type.lvl0}
            //                     </span>
            //                 </div>
            //             ) : (
            //                 <span>
            //                     {hit.type.lvl0}/{hit.race}
            //                 </span>
            //             )}
            //         </div>
            //     </Card.ImgOverlay>
            //     <Card.Body>
            //         <Card.Title>
            //             <Link
            //                 to={`/card/${hit.objectID}`}
            //                 onClick={() => selectThisCard(hit)}
            //             >
            //                 {hit.name}
            //             </Link>
            //         </Card.Title>
            //     </Card.Body>
            // </Card>

        )
    }
}

export default AlgoliaHit
