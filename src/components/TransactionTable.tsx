import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RootState } from '@/store';
import type { Dispute } from '@/types';
import { ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  disputes: Dispute[];
  onDispute: (id: string) => void;
}

const TransactionTable = ({ disputes, onDispute }: Props) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [sortValue, setSortValue] = useState('amount');

  const onStatusChange = (value: string) => {
    setStatus(value);
  };

  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );

  const filtered = useMemo(() => {
    const result = transactions
      .filter((txn) =>
        txn.merchant.toLowerCase().includes(search.toLowerCase())
      )
      .filter((txn) => {
        if (status === '' || status === 'ALL') return true;
        return txn.status === status;
      });

    const disputeCounts = new Map<string, number>();
    for (const txn of result) {
      disputeCounts.set(
        txn.id,
        disputes.filter((d) => d.txnId === txn.id).length
      );
    }

    result.sort((a, b) => {
      if (sortValue === 'amount') {
        return sortAsc ? a.amount - b.amount : b.amount - a.amount;
      }
      const aCount = disputeCounts.get(a.id) || 0;
      const bCount = disputeCounts.get(b.id) || 0;
      return sortAsc ? aCount - bCount : bCount - aCount;
    });
    return result;
  }, [search, sortAsc, transactions, status, sortValue, disputes]);

  return (
    <Card className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          placeholder="Search by merchant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="SUCCESS">SUCCESS</SelectItem>
            <SelectItem value="FAILED">FAILED</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSortValue('disputes');
            setSortAsc((prev) => !prev);
          }}
          className="flex items-center gap-2"
        >
          Disputes <ArrowUpDown size={16} />
        </Button>
        <Button
          variant="outline"
          onClick={() => setSortAsc((prev) => !prev)}
          className="flex items-center gap-2"
        >
          Amount <ArrowUpDown size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filtered.map((txn) => (
          <Card
            key={txn.id}
            className="p-3 hover:shadow-lg hover:bg-muted/40 transition-all duration-200 border border-border"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{txn.merchant}</p>
                <p className="text-xs text-muted-foreground">
                  {txn.currency} {txn.amount}
                </p>
                <p className="text-xs text-muted-foreground">{txn.date}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="w-28 justify-center">
                  Disputes: {disputes.filter((d) => d.txnId === txn.id).length}
                </Badge>
                <Badge
                  variant={txn.status === 'FAILED' ? 'destructive' : 'default'}
                  className="w-28 justify-center"
                >
                  {txn.status}
                </Badge>
              </div>

              <div className="sm:ml-auto">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={() => onDispute(txn.id)}
                >
                  Dispute
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default TransactionTable;
