import React from "react"
import ContentLoader from "react-content-loader"

const TableLoader = (props) => (
  <ContentLoader
  width={1000}
  height={550}
  viewBox="0 0 1100 550"
  backgroundColor="#eaeced"
  foregroundColor="#ffffff"
  {...props}
>
  <rect x="0" y="0" rx="10" ry="5" width="885" height="37" />
  <rect x="0" y="0" rx="10" ry="5" width="1000" height="12" />
  <rect x="0" y="30" rx="10" ry="5" width="885" height="37" />
  <rect x="0" y="52" rx="10" ry="5" width="1000" height="15" />
  <rect x="1085" y="2" rx="10" ry="5" width="15" height="57" />

  <rect x="0" y="75" rx="10" ry="5" width="1000" height="47" />
  <rect x="0" y="130" rx="10" ry="5" width="1000" height="47" />
  <rect x="0" y="185" rx="10" ry="5" width="1000" height="47" />


  {/* <rect x="0" y="0" rx="10" ry="5" width="1406" height="57" /> */}



  
  </ContentLoader>
)

export default TableLoader
