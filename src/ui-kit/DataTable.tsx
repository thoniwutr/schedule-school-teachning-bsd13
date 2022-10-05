import ReactDataTable, { TableProps } from 'react-data-table-component'
import { Colors } from '../sc-design/colors'

export default function DataTable<T>(props: TableProps<T>) {
  const { customStyles, ...otherProps } = props

  return (
    <ReactDataTable
      {...otherProps}
      customStyles={{
        ...{
          responsiveWrapper: {
            style: {
              boxShadow: props.progressPending
                ? ''
                : '0 5px 25px 0 rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              overflowY: 'hidden',
            },
          },
          table: {
            style: {
              width: '100%',
              fontFamily: 'Assistant',
              borderRadius: '10px',
            },
          },
          headRow: {
            style: {
              background: '#f0f1f6',
              minHeight: '40px',
            },
          },
          head: {
            style: {
              height: '40px',
            },
          },
          headCells: {
            style: {
              height: '40px',
              fontSize: '0.75rem',
              fontWeight: '600',
            },
          },
          rows: {
            style: {
              height: '56px',
            },
            highlightOnHoverStyle: {
              backgroundColor: '#f5f7ff',
            },
          },
          cells: {
            style: {
              fontSize: '0.875rem',
              fontFamily: 'Assistant',
              fontWeight: 600,
              color: Colors.tableText,
            },
          },
          pagination: {
            style: {
              borderTop: 0,
            },
          },
          ...customStyles,
        },
      }}
    />
  )
}
