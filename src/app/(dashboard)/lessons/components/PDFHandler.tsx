
export default function PDFHandler({ handleMediaUpload, mediaUrl }: any) {
  return (
    <>
      {
        <>
          <input
          style={{gridRowStart:1,gridColumnStart:2 , gridColumn:"span 3" , padding:"10px"}}
            type="file"
            accept="application/pdf"
            onChange={handleMediaUpload}
          />
        </>
      }
      {mediaUrl && (
        <>
          <object
            data={mediaUrl}
            type="application/pdf"
            width="100%"
            style={{gridRow : 'span 11',
                gridColumn:'span 5'
                ,height:'100%'}}
          >
            <p>
              Alternative text - include a link{" "}
              <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
              Open PDF in new tab
            </a>
            </p>
          </object>
          
        </>
      )}
    </>
  );
}
