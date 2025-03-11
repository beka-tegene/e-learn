import { Stack } from "@mui/material"
import { useEffect, useRef } from "react"
import image1 from "/assets/img/brand.png"
import image2 from "/assets/img/brand02.png"
import image3 from "/assets/img/brand03.png"
import image4 from "/assets/img/brand04.png"
import image5 from "/assets/img/brand05.png"
import image6 from "/assets/img/brand06.png"
import image7 from "/assets/img/brand07.png"

const imageData = [
  {
    img: image1
  },
  {
    img: image2
  },
  {
    img: image3
  },
  {
    img: image4
  },
  {
    img: image5
  },
  {
    img: image6
  },
  {
    img: image7
  }
]

const Highlight = () => {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    let scrollInterval
    const scrollRight = () => {
      const scrollAmount = 1
      if (container) {
        container.scrollLeft += scrollAmount
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0
        }
      }
    }
    scrollInterval = setInterval(scrollRight, 30)
    return () => clearInterval(scrollInterval)
  }, [])

  return (
    <div>
      <div className="container">
        <div className="row brand-active">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              position: "relative"
            }}
          >
            <style>
              {`
                ::-webkit-scrollbar {
                    display: none;
                }
            `}
            </style>
            <Stack
              direction={"row"}
              gap={3}
              sx={{
                width: "100%",
                padding: "2rem",
                overflowX: "auto",
                "& > *": { flex: "0 0 225px", minWidth: 225, maxWidth: 225 },
                transform: "translateX(0)"
              }}
              ref={containerRef}
            >
              {imageData.map((item, index) => (
                <div className="col" key={index}>
                  <div>
                    <span>
                      <img src={item.img} alt="brand" />
                    </span>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Highlight
