import { type ChangeEvent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { type FieldConfig } from '../data/types';

type FormMode = 'create' | 'edit';

type FormValue = Record<string, any>;

interface EntityFormDialogProps {
  open: boolean;
  mode: FormMode;
  fields: FieldConfig[];
  value: FormValue;
  loading: boolean;
  onChange: (field: FieldConfig, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function EntityFormDialog({
  open,
  mode,
  fields,
  value,
  loading,
  onChange,
  onClose,
  onSubmit,
}: EntityFormDialogProps) {
  const handleChange = (field: FieldConfig) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange(field, event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Novo Registo' : 'Editar Registo'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {fields.map((field) => (
            <TextField
              key={field.key}
              label={field.label}
              type={field.type === 'datetime' ? 'datetime-local' : field.type}
              select={field.type === 'select'}
              fullWidth
              required={field.required}
              value={value[field.key] ?? ''}
              onChange={handleChange(field)}
              InputLabelProps={field.type === 'date' || field.type === 'datetime' ? { shrink: true } : undefined}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={loading}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
