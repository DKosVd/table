import { Company } from "../types";


function prepareSelectedCompanies(companies: Company[]) {
    const obj: {[k: string]: boolean} = {};
    companies.forEach(company => obj[company.id] = false )
    return obj;
}

export default prepareSelectedCompanies;