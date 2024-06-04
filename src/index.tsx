import { createRoot } from 'react-dom/client';
import { RootApp } from '~/app/ui';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RootApp />);
