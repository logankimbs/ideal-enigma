'use client';

import { useState } from 'react';
import { Button } from '../../../components/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '../../../components/dialog';
import { Field, FieldGroup, Label } from '../../../components/fieldset';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';
import { Textarea } from '../../../components/textarea';

export function AddInsight({
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Add an Insight</DialogTitle>

        <DialogDescription>
          Your insights are invaluable. Share what you’ve learned to empower
          your team. Submit an insight and let’s achieve greatness together!
        </DialogDescription>

        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Share your insight</Label>
              <Textarea name="insight" />
            </Field>

            <Field>
              <Label>Tag your insight</Label>
              <Select name="tag" defaultValue="">
                <option value="" disabled>
                  Select a tag&hellip;
                </option>
              </Select>
            </Field>

            <Field>
              <Label>Attach a link</Label>
              <Input name="link" />
            </Field>
          </FieldGroup>
        </DialogBody>

        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>

          <Button disabled>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
