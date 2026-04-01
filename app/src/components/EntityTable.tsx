import {
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { type EntityRecord } from '../hooks/useEntityData';

interface EntityTableProps {
  columns: string[];
  items: EntityRecord[];
  loading: boolean;
  onView: (item: EntityRecord) => void;
  onEdit: (item: EntityRecord) => void;
  onDelete: (item: EntityRecord) => void;
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
}

export default function EntityTable({ columns, items, loading, onView, onEdit, onDelete }: EntityTableProps) {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
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
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              {columns.map((col) => (
                <TableCell key={col} sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
                  {col.replace('_', ' ')}
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
                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">Sem registos ainda.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id ?? JSON.stringify(item)} hover>
                  {columns.map((col) => (
                    <TableCell key={col}>{formatCell(item[col])}</TableCell>
                  ))}
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Ver detalhes">
                        <IconButton size="small" onClick={() => onView(item)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" onClick={() => onEdit(item)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Apagar">
                        <IconButton size="small" onClick={() => onDelete(item)}>
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
  );
}
