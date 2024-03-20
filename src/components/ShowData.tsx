export default function ShowData({Loading , Cols ,Data ,Subject, setAddORUpdate,Modify,Remove}:any){
    return (
                <div className={` m-5   relative`}
                style={{minHeight : Loading ? '60vh' : 'auto'}}
                >
          {Loading ? (
            <>
          <div id="loading">
            <div id="load">
              <div>G</div>
              <div>N</div>
              <div>I</div>
              <div>D</div>
              <div>A</div>
              <div>O</div> 
              <div>L</div>
            </div>
          </div>
          <div className=" col-span-4 row-span-12  m-5  relative">
            <table className="w-full ">
              <thead className="theader">
                <tr className="hidden">
                  {Cols.map((col:any,index:any)=> <td key={col}>{col}</td>)}
                </tr>
              </thead>
              <tbody>
                <tr className="hidden">
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          </>

      ) : (
          <table className="w-full ">
            <thead className="theader">
              <tr>
              {Cols.map((col:any,index:any)=> <td key={col}>{col}</td>)}
              </tr>
            </thead>
            <tbody  >
              {/* Mapping over modules to display them in the table */}
              {Data.map((oneData:any,index:number) => (
                <tr  key={index} id={`tr-${index}`}>
                  {Object.keys(oneData).map((key:any,innerIndex)=>{
                    if(innerIndex >= Cols.length -1  ) return
                    // if(typeof oneData) == 'object') 
                    if(key == '_id') return <td>{oneData[key].slice(-5)}</td>
                    if(key != '_id') return <td>{ key == 'password' ? '******':  oneData[key] }</td>
                  })}
                  
                  {/* Buttons to modify or delete the module */}
                  <td className="p-1 flex justify-around items-center" style={{ height: '100%' }}>
                    <button
                      onClick={(e) => { setAddORUpdate(false); Modify(index) }}
                      className="modifyBTN"
                    >
                      Modify {Subject}
                    </button>
                    <button
                      onClick={(e) => Remove(index)}
                      className="removeBTN "
                    >
                      Delete {Subject}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
      </div>
      
      )
}