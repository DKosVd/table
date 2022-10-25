


type TableProps =  {
    children: React.ReactNode
}

export const Table: React.FC<TableProps> = ({children}) => {
    return (
    <table>
        <tbody>
            {children}
        </tbody>
    </table>
    )
}