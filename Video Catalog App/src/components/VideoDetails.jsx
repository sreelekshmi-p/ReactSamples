import { Row, Col, ListGroupItem, Image } from 'react-bootstrap';
import './VideoDetails.css';

const VideoDetails = (
    {
        Title,
        Year,
        imdbID,
        Type,
        Poster
    }
) => {
    return (
        <ListGroupItem>
            <Row>
                <Col xs={1} className="d-flex flex-column align-items-left">                    
                    <Image src={Poster} alt={Title} fluid />
                </Col>
                <Col xs={11}>
                    <div className="mb-2">{Title}</div>
                </Col>
                <Col xs={11}>
                    <div className="mb-2">{Year}</div>
                </Col>
                <Col xs={11}>
                    <div className="mb-2">{Type}</div>
                </Col>
            </Row>
        </ListGroupItem>
    );
}
 
export default VideoDetails;