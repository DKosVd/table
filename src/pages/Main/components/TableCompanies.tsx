import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteCompaniesAction, setCompaniesAction, setSelectedCompaniesAction, setStatusAction } from "../../../app-state/Company/company";
import { hasMoreCompaniesSelector, selectCompaniesItems, selectCurrentCompany, selectSelectedCompanies } from "../../../app-state/Company/selector";
import { resetPageAction } from "../../../app-state/Employees/employees";
import { useAppDispatch } from "../../../app-state/hooks";
import { InfitieScroll } from "../../../components/InfiniteScroll/InfiniteScroll";
import { Table } from "../../../components/Table/Table";
import selectedAllElements from "../../../utils/prepareSelectedCompanies";

const TableCompanies = () => {
    const loadMoreCompanies = () => {
        dispatch(setCompaniesAction())
    }

    const dispatch = useAppDispatch();
    const companies = useSelector(selectCompaniesItems);
    const selectedCompanies = useSelector(selectSelectedCompanies);
    const isEdit = useSelector(selectCurrentCompany);
    const hasMoreCompanies = useSelector(hasMoreCompaniesSelector);

    useEffect( () => {
        dispatch(setCompaniesAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handlerDelete = () => {
        dispatch(deleteCompaniesAction(selectedCompanies))
    }


    const handlerAdd = (event: Event) => {
        if(!isEdit) {
            dispatch(setStatusAction('add'));
        }
    }

    const handlerPick = useCallback((idx: number) => {
        dispatch(setSelectedCompaniesAction(idx))
        dispatch(resetPageAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlerPickAll = () => {
        dispatch(setSelectedCompaniesAction(selectedAllElements(companies)))
    }

    if(companies.length === 0) {
        return <div>Таблица пустая</div>
    }
    
    return   (
            <InfitieScroll hasMoreData={hasMoreCompanies} loadOnMount={false} isLoading={false} onBottomHit={loadMoreCompanies}>
                <Table selectedItems={selectedCompanies} handlerPick={handlerPick} handlerPickAll={handlerPickAll} handlerAdd={handlerAdd} handlerDelete={handlerDelete}  dataItem={companies}/>
            </InfitieScroll>
        );
}


export default TableCompanies;