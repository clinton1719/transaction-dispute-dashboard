import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitDispute } from '@/store/slices/disputeSlice';
import mockTransactions from '@/utils/mockTransactions.json';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const disputeSchema = z.object({
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  comments: z.string().optional(),
});

type DisputeFormValues = z.infer<typeof disputeSchema>;

const NewDispute = () => {
  const dispatch = useDispatch();

  const { toast } = useToast();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const txnId = params.get('txnId');

  const txn = txnId
    ? mockTransactions.filter((txn) => txn.id === txnId)[0]
    : null;

  const { register, handleSubmit, reset, formState } =
    useForm<DisputeFormValues>({
      resolver: zodResolver(disputeSchema),
    });

  const onSubmit = (data: DisputeFormValues) => {
    dispatch(
      submitDispute({
        txnId: txnId!,
        reason: data.reason,
        comments: data.comments,
        createdAt: new Date().toISOString(),
      })
    );

    reset();

    toast({
      title: 'Dispute Submitted',
      description: 'Your dispute has been saved successfully.',
    });

    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };

  if (!txn) {
    return (
      <div className="text-center mt-10 space-y-4">
        <p className="text-muted-foreground">
          No transaction selected to raise a dispute.
        </p>
        <br />
        <Link to="/">
          <Button variant="default">Raise Dispute</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Raise a Dispute</h1>

      <Card className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">
          <strong>Transaction:</strong> {txn.merchant} - {txn.currency}{' '}
          {txn.amount}
        </div>
        <div className="text-sm text-muted-foreground">
          <strong>Date:</strong> {txn.date}
        </div>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="reason">Reason for Dispute</Label>
          <Input
            id="reason"
            placeholder="e.g. Unauthorized charge"
            {...register('reason')}
          />
          {formState.errors.reason && (
            <p className="text-red-500 text-sm">
              {formState.errors.reason.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="comments">Additional Comments</Label>
          <Textarea
            id="comments"
            placeholder="Describe the issue..."
            {...register('comments')}
          />
        </div>

        <Button type="submit">Submit Dispute</Button>
      </form>
    </div>
  );
};

export default NewDispute;
