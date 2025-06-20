import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { RootState } from '@/store';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TransactionItem = () => {
  const { id } = useParams<{ id: string }>();

  const transactions = useSelector(
    (state: RootState) => state.transactions.items
  );

  const txn = transactions.find((txn) => txn.id === id);

  if (!id || !txn) {
    return <p>No transaction found</p>;
  }

  const handleDownloadPDF = async () => {
    const input = document.getElementById('transaction-details');
    if (!input) return;

    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(input, {
      scale: 2,
      scrollY: -window.scrollY,
      useCORS: true,
    } as unknown as Partial<Record<string, unknown>>);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save(`transaction-${txn.id}.pdf`);
  };

  return (
    <>
      <Card
        className="p-6 space-y-4 max-w-3xl mx-auto"
        id="transaction-details"
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Transaction ID</p>
            <p className="font-semibold">{txn.id}</p>
          </div>
          <div className="text-right sm:text-left">
            <p className="text-muted-foreground text-sm">Date</p>
            <p className="font-medium">{new Date(txn.date).toLocaleString()}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Merchant</p>
            <p className="font-medium">{txn.merchant}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Category</p>
            <p className="font-medium">{txn.merchantCategory}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Amount</p>
            <p className="font-bold text-lg">
              {txn.currency}{' '}
              {txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Status</p>
            <Badge
              variant={txn.status === 'FAILED' ? 'destructive' : 'default'}
            >
              {txn.status}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Payment Method</p>
            <p className="font-medium">{txn.paymentMethod}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Reference #</p>
            <p className="font-mono text-sm">{txn.referenceNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Initiated By</p>
            <p className="font-medium">{txn.initiatedBy}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Account ID</p>
            <p className="font-medium">{txn.accountId}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Location</p>
            <p className="font-medium">{txn.location}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">OTP Verified</p>
            <p className="font-medium">{txn.otpVerified ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Fraud Check</p>
            <p className="font-medium">
              {txn.fraudCheckPassed ? 'Passed' : 'Failed'}
            </p>
          </div>
        </div>
      </Card>
      <Button
        variant="default"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </Button>
    </>
  );
};

export default TransactionItem;
