/* eslint-disable react/prop-types */
const MaxWidthWrapper = ({ children }) => {
  return (
    <div className='mx-auto w-full h-full max-w-screen-xl px-2.5 md:px-4  '>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
