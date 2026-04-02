import { Paper, Tab, Tabs } from '@mui/material';
import { type EntityConfig } from '../data/types';

interface EntityTabsProps {
  entities: EntityConfig[];
  active: number;
  onChange: (value: number) => void;
}

export default function EntityTabs({ entities, active, onChange }: EntityTabsProps) {
  return (
    <Paper elevation={0} className="tabs-shell">
      <Tabs
        value={active}
        onChange={(_, value) => onChange(value)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {entities.map((entity) => (
          <Tab key={entity.key} label={entity.title} />
        ))}
      </Tabs>
    </Paper>
  );
}
