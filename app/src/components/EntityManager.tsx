import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";

import { apiFetch } from "../api/client";
import type { EntityConfig, FieldConfig } from "../data/entities";

type EntityRecord = Record<string, unknown> & { id?: number };

type FormMode = "create" | "edit";

function buildEmptyForm(fields: FieldConfig[]) {
  return fields.reduce<Record<string, unknown>>((acc, field) => {
    acc[field.key] = "";
    return acc;
  }, {});
}

function normalizeValue(field: FieldConfig, value: string) {
  if (field.type === "number") {
    return value === "" ? "" : Number(value);
  }
  return value;
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  return String(value);
}

export default function EntityManager({ config }: { config: EntityConfig }) {
  const [items, setItems] = useState<EntityRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [formData, setFormData] = useState<EntityRecord>(() =>
    buildEmptyForm(config.fields),
  );
  const [selected, setSelected] = useState<EntityRecord | null>(null);

  const columns = useMemo(
    () => ["id", ...config.fields.map((field) => field.key)],
    [config.fields],
  );

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch<EntityRecord[]>(config.endpoint);
      setItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    setFormData(buildEmptyForm(config.fields));
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const openCreate = () => {
    setFormMode("create");
    setSelected(null);
    setFormData(buildEmptyForm(config.fields));
    setDialogOpen(true);
  };

  const openEdit = (item: EntityRecord) => {
    setFormMode("edit");
    setSelected(item);
    const nextForm = buildEmptyForm(config.fields);
    config.fields.forEach((field) => {
      const value = item[field.key];
      nextForm[field.key] = value ?? "";
    });
    setFormData(nextForm);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleChange =
    (field: FieldConfig) => (event: ChangeEvent<HTMLInputElement>) => {
      const next = normalizeValue(field, event.target.value);
      setFormData((prev) => ({ ...prev, [field.key]: next }));
    };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (formMode === "create") {
        await apiFetch(config.endpoint, {
          method: "POST",
          body: JSON.stringify(formData),
        });
      } else if (selected?.id) {
        await apiFetch(`${config.endpoint}/${selected.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
      }
      closeDialog();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao guardar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: EntityRecord) => {
    if (!item.id) return;
    try {
      setLoading(true);
      setError(null);
      await apiFetch(`${config.endpoint}/${item.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao apagar item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ md: "center" }}
        mb={3}
      >
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreate}
          >
            Novo
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {loading ? (
          <Stack alignItems="center" py={6}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" mt={2}>
              A carregar dados...
            </Typography>
          </Stack>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "action.hover" }}>
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{ fontWeight: 700, textTransform: "capitalize" }}
                  >
                    {col.replace("_", " ")}
                  </TableCell>
                ))}
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    align="center"
                    sx={{ py: 6 }}
                  >
                    <Typography color="text.secondary">
                      Sem registos ainda.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} hover>
                    {columns.map((col) => (
                      <TableCell key={col}>{formatCell(item[col])}</TableCell>
                    ))}
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => openEdit(item)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Apagar">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {formMode === "create" ? "Novo Registo" : "Editar Registo"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {config.fields.map((field) => (
              <TextField
                key={field.key}
                label={field.label}
                type={field.type === "datetime" ? "datetime-local" : field.type}
                select={field.type === "select"}
                fullWidth
                required={field.required}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field)}
                InputLabelProps={
                  field.type === "date" || field.type === "datetime"
                    ? { shrink: true }
                    : undefined
                }
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
          <Button onClick={closeDialog} color="inherit">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
