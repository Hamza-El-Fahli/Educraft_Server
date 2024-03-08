export default function ShowData({Loading , Cols ,Data ,Subject, setAddORUpdate,Modify,Remove}:any){
    return (
                <div className=" border m-5   relative">
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
          <div className=" col-span-4 row-span-12 border m-5  relative">
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
            <tbody>
              {/* Mapping over modules to display them in the table */}
              {Data.map((oneData:any,index:number) => (
                <tr key={index} id={`tr-${index}`}>
                  {Object.keys(oneData).map((key:any,index)=>{
                    if(index >= Cols.length -1  ) return
                    // if(typeof oneData) == 'object') 
                    return <td>{typeof oneData[key] != 'object' ? ( key == 'password' ? '******':  oneData[key] ): oneData[key][Object.keys(oneData[key])[1]]}</td>
                  })}
                  
                  {/* Buttons to modify or delete the module */}
                  <td className="p-1 flex justify-around items-center" style={{ height: '100%' }}>
                    <button
                      onClick={(e) => { setAddORUpdate(false); Modify(index+'') }}
                      className="p-2 text-firstBlue border border-firstBlue rounded-full font-bold "
                    >
                      Modify {Subject}
                    </button>
                    <button
                      onClick={(e) => Remove(e)}
                      className="p-2 text-red-500 border border-red-500 rounded-full font-bold "
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