export default function Quizes(){



    let Data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    return( 
    
    <div className=" col-span-4">
    <div className=" h-10 " />
{Data.map((quiz , index)=>{
    return (
        <div className="border rounded-t-md h-10 hover:h-60 duration-500 px-5 py-1 m-0 overflow-hidden bg-secondary" key={index}>
        <div className="h-10 p-0 m-0">My Quiz Data {quiz}</div>
        <div className="h-10 p-0 m-0">Answer</div>
        <div className="h-10 p-0 m-0">Answer</div>
        <div className="h-10 p-0 m-0">Answer</div>
        <div className="h-10 p-0 m-0">Answer</div>
        <div className="h-10 p-0 m-0">Correct Answer</div>
        </div>
        
    )
})}
   
   
    
    </div>)
}