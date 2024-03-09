"use client"


import ShowQuizes from "@/components/ShowQuizes";
export default function Quizes() {
    let Data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  return (
    <div className="col-span-4">
        <ShowQuizes Data={Data} />
    </div>
  );
}
