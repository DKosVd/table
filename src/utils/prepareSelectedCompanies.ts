import { Company, Employee } from "../types";


function selectedAllElements(selects: Company[] | Employee[]) {
    const obj: {[k: string]: boolean} = {};
    selects.forEach(select => obj[select.id] = true )
    return obj;
}

export default selectedAllElements;