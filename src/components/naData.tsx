import '@/styles/noData.css'
import '@/styles/noData.scss'
import { noData_Style } from "@/services/globalConfigurations"

export default function NoData() {
    if (noData_Style.includes("barStyle"))
        return (
            <div className="noData_barStyle">
                <b>
                    No<span> Da</span><span>ta</span><span> is</span><span> Av</span>al<span>iab</span>le
                </b>
            </div>
        );
    else
        if (noData_Style.includes("dactylo"))
            return (
                <div className='h-full flex flex-col justify-center'>
                    <div className="typing-slider">
                    <p>No data is Avaliable</p>
                    <p>Add new Data</p>
                    <p></p>
                </div>
                </div>
            );
}