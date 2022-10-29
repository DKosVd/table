import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteEmployeesAction } from "../../../app-state/Company/company";
import { selectCurrentCompany } from "../../../app-state/Company/selector";
import { deleteEmployeeAction, setEmployeesByCompanyIdAction, setSelectedEmployeesAction, setStatusEmployeeAction } from "../../../app-state/Employees/employees";
import { selectEmployesByIdCompany, selectSelectedEmployees } from "../../../app-state/Employees/selector";
import { useAppDispatch } from "../../../app-state/hooks";
import { InfitieScroll } from "../../../components/InfiniteScroll/InfiniteScroll";
import { Table } from "../../../components/Table/Table";
import selectedAllElements from "../../../utils/prepareSelectedCompanies";

const TableEmployees = () => {
    const dispatch = useAppDispatch();
    const idCompany = useSelector(selectCurrentCompany);
    const employees = useSelector(selectEmployesByIdCompany);
    const selectedEmployees = useSelector(selectSelectedEmployees)

    const loadMoreEmployees = () => {
        if(idCompany && idCompany[0]) {
            const id = idCompany[0].id;
            dispatch(setEmployeesByCompanyIdAction(id))
        }
    }

    useEffect( () => {
        if(idCompany && idCompany[0]) {
            const id = idCompany[0].id;
            dispatch(setEmployeesByCompanyIdAction(id))
        }
    }, [dispatch, idCompany])

    const handlerDelete = (event: MouseEvent) => {
        if(idCompany && idCompany[0]) {
            dispatch(deleteEmployeesAction({
                items: selectedEmployees,
                id: +idCompany[0].id
            }))
            dispatch(deleteEmployeeAction(selectedEmployees))
        }
    }

    const handlerAdd = () => {
        dispatch(setStatusEmployeeAction('add'))
    }

    const handlerPick = useCallback((idx: number) => {
        dispatch(setSelectedEmployeesAction(idx))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlerPickAll = () => {
        dispatch(setSelectedEmployeesAction(selectedAllElements(employees)))
    }


    if(idCompany) {
        return (
            <InfitieScroll loadOnMount={false} isLoading={false} hasMoreData={true} onBottomHit={loadMoreEmployees}>
                <Table handlerPick={handlerPick} selectedItems={selectedEmployees} handlerPickAll={handlerPickAll} handlerAdd={handlerAdd} handlerDelete={handlerDelete} dataItem={employees}/>
            </InfitieScroll>
        )
    }
    
    return <p>Выберите компанию</p>;
}

export default TableEmployees;