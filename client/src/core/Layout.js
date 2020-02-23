import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask } from
  "mdbreact";
import Menu from "./Menu";
import img1 from '../img/b1.png'
import img2 from '../img/b4.png'
import img3 from '../img/b5.png'

import "../styles.css";


const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children
}) => (
    <div>
      <Menu />
      <div id='h' className="container h-50 mt-5 mb-5">
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
         className="z-depth-1"
        slide
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                
                  className="d-block  m-auto img-thumbnail "
                  src={img2}
                  alt="First slide"
                />
                <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption>
              <div id='m'>
               <strong> <h3 className="h3-responsive display-5">{title}</h3> </strong>
               <div className=''>

                <p>{description}</p>
               </div>
                </div>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                
                  className="d-block  m-auto img-thumbnail"
                    src={img3} 
                 alt="Second slide"
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption>
              <div id='m'>
                  <h3 className="h3-responsive display-5">{title}</h3>
                  <p>{description}</p>
                </div>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                
                  className="d-block  m-auto img-thumbnail"
                  src={img1} 
                  alt="Third slide"
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
              <div id='m'>
                <h3 className="h3-responsive display-5">{title}</h3>
                <p>{description}</p>
                </div>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </div>
      <div className={className}>{children}</div>
    </div>
  );

export default Layout;