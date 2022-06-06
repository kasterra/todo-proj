import styled from '@emotion/styled';
import { useCallback } from 'react';
import { theme as chakraTheme } from '@chakra-ui/react';

interface IContainer {
  headInfo: {
    headList: { width: string | number; content: any }[];
    height: string | number;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 48px;
  padding: 53px auto;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid ${chakraTheme.colors.gray[200]};
  border-radius: 6px;
`;

const TableHeader = styled.div<IContainer>`
  display: flex;
  align-items: center;
  display: grid;
  grid-template-rows: ${props => props.headInfo.height};
  grid-template-columns: ${props =>
    props.headInfo.headList
      .map(item => {
        if (typeof item.width === 'string') return item.width;
        else return item.width + ' px';
      })
      .join(' ')};
`;

const TableRow = styled.div<IContainer & { height: string | number }>`
  display: grid;
  grid-template-columns: ${props =>
    props.headInfo.headList
      .map(item => {
        if (typeof item.width === 'string') return item.width;
        else return item.width + ' px';
      })
      .join(' ')};
  grid-auto-rows: ${props => props.height};
  &:hover {
    background-color: ${chakraTheme.colors.gray[100]};
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
`;

interface ITableProps {
  headInfo: {
    headList: { width: string | number; content: any }[];
    height: string | number;
  };
  contentTable: { content: any[][]; height: string | number };
}

const Table = ({ headInfo, contentTable }: ITableProps) => {
  const renderItem = useCallback((renderer: any) => {
    if (typeof renderer === 'function') {
      return renderer();
    } else if (typeof renderer === 'string' || typeof renderer === 'object') {
      return renderer;
    }
  }, []);
  return (
    <Container>
      <TableHeader headInfo={headInfo}>
        {headInfo.headList.map(item => renderItem(item.content))}
      </TableHeader>

      {contentTable.content.map(row => (
        <TableRow headInfo={headInfo} height={contentTable.height}>
          {row.map(item => (
            <TableCell>{renderItem(item)}</TableCell>
          ))}
        </TableRow>
      ))}
    </Container>
  );
};

export default Table;
