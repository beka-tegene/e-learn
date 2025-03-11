import { Component } from "react"
import image1 from "/assets/img/breadcrumb_bg2.png"
import { RiArrowRightSLine } from "react-icons/ri"
class Header extends Component {
  render() {
    const divStyle = {
      backgroundImage: `url(${image1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
    };
    return (
      <section className="breadcrumb-area breadcrumb-bg " style={divStyle}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h3 className="title">Our Courses</h3>
                <nav className="breadcrumb">
                  <span property="itemListElement" typeof="ListItem">
                    <a href="/">Home</a>
                  </span>
                  <span className="breadcrumb-separator">
                    <RiArrowRightSLine />
                  </span>
                  <span property="itemListElement" typeof="ListItem">
                    All Courses
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Header
