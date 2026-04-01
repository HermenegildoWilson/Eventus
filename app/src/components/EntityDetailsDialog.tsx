import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { type FieldConfig } from '../data/entities';
import { type EntityRecord } from '../hooks/useEntityData';

interface EntityDetailsDialogProps {
  open: boolean;
  title: string;
  fields: FieldConfig[];
  record: EntityRecord | null;
  onClose: () => void;
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
}

export default function EntityDetailsDialog({
  open,
  title,
  fields,
  record,
  onClose,
}: EntityDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" color="text.secondary">
              ID
            </Typography>
            <Typography fontWeight={600}>{formatValue(record?.id)}</Typography>
          </Stack>
          <Divider />
          {fields.map((field) => (
            <Stack key={field.key} direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">
                {field.label}
              </Typography>
              <Typography fontWeight={600}>{formatValue(record?.[field.key])}</Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
