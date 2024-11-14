'use client';

import { useState } from 'react';
import { Button } from '../../../components/button';
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from '../../../components/dialog';

export function AddInsight({
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>This feature is coming soon!</DialogTitle>

        <DialogDescription>
          In the meantime, please visit our Slack app to add an insight.
        </DialogDescription>

        <DialogActions>
          <Button href="#" onClick={() => setIsOpen(false)}>
            Return to Repository
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
