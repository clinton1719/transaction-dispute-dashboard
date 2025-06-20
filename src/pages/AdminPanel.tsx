import { useSelector } from 'react-redux';
import { type RootState } from '@/store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const disputes = useSelector((state: RootState) => state.disputes.items);
  const navigate = useNavigate();

  if (disputes.length === 0) {
    return (
      <p className="text-muted-foreground text-center mt-10">
        No disputes submitted yet.
      </p>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Dispute Management</h1>

      <div className="space-y-4">
        {disputes.map((d, i) => (
          <Card
            key={i}
            className="p-4 space-y-2 cursor-pointer hover:shadow-4xl hover:bg-muted/40 transition-all duration-200 border border-border"
            onClick={() => navigate(`/transaction-item/${d.txnId}`)}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm">
                Txn ID: <span className="text-muted-foreground">{d.txnId}</span>
              </div>
              <Badge variant="secondary">Submitted</Badge>
            </div>
            <div className="text-sm">
              <strong>Reason:</strong> {d.reason}
            </div>
            <div className="text-sm">
              <strong>Comments:</strong> {d.comments || '-'}
            </div>
            <div className="text-xs text-muted-foreground">
              Submitted on {new Date(d.createdAt).toLocaleString()}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
