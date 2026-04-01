import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

import { type EntityConfig, type FieldConfig } from '../data/entities';
import EntityFormDialog from './EntityFormDialog';
import EntityDetailsDialog from './EntityDetailsDialog';
import EntityTable from './EntityTable';
import { useEntityData, type EntityRecord } from '../hooks/useEntityData';

type FormMode = 'create' | 'edit';

type FormValue = Record<string, any>;

function buildEmptyForm(fields: FieldConfig[]) {
  return fields.reduce<FormValue>((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});
}

function normalizeValue(field: FieldConfig, value: string) {
  if (field.type === 'number') {
    return value === '' ? '' : Number(value);
  }
  return value;
}

export default function EntityManager({ config }: { config: EntityConfig }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [formData, setFormData] = useState<FormValue>(() => buildEmptyForm(config.fields));
  const [selected, setSelected] = useState<EntityRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { items, loading, error, load, createItem, updateItem, removeItem } = useEntityData(config.endpoint);

  const columns = useMemo(() => ['id', ...config.fields.map((field) => field.key)], [config.fields]);

  useEffect(() => {
    void load();
    setFormData(buildEmptyForm(config.fields));
    setSelected(null);
  }, [config, load]);

  const openCreate = () => {
    setFormMode('create');
    setSelected(null);
    setFormData(buildEmptyForm(config.fields));
    setDialogOpen(true);
  };

  const openEdit = (item: EntityRecord) => {
    setFormMode('edit');
    setSelected(item);
    const nextForm = buildEmptyForm(config.fields);
    config.fields.forEach((field) => {
      const value = item[field.key];
      nextForm[field.key] = value ?? '';
    });
    setFormData(nextForm);
    setDialogOpen(true);
  };

  const openDetails = (item: EntityRecord) => {
    setSelected(item);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (field: FieldConfig, value: string) => {
    const next = normalizeValue(field, value);
    setFormData((prev) => ({ ...prev, [field.key]: next }));
  };

  const handleSubmit = async () => {
    if (formMode === 'create') {
      await createItem(formData);
    } else if (selected?.id) {
      await updateItem(selected.id, formData);
    }
    closeDialog();
  };

  const handleDelete = async (item: EntityRecord) => {
    if (!item.id) return;
    await removeItem(item.id);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} mb={3}>
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {config.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {config.description}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Atualizar">
            <IconButton onClick={load} disabled={loading} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Novo
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <EntityTable
        columns={columns}
        items={items}
        loading={loading}
        onView={openDetails}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <EntityFormDialog
        open={dialogOpen}
        mode={formMode}
        fields={config.fields}
        value={formData}
        loading={loading}
        onChange={handleChange}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />

      <EntityDetailsDialog
        open={detailsOpen}
        title={`${config.title} · Detalhes`}
        fields={config.fields}
        record={selected}
        onClose={closeDetails}
      />
    </Box>
  );
}
