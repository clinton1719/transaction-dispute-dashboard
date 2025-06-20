import TransactionTable from '@/components/TransactionTable';
import { type RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const disputes = useSelector((state: RootState) => state.disputes.items);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Recent Transactions</h1>
      <p className="text-muted-foreground text-sm">
        You have raised <span className="font-semibold">{disputes.length}</span>{' '}
        dispute{disputes.length !== 1 && 's'}.
      </p>
      <TransactionTable
        disputes={disputes}
        onDispute={(txnId) => navigate(`/disputes/new?txnId=${txnId}`)}
      />
    </div>
  );
};

export default Dashboard;
