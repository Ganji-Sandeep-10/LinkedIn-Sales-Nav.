import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1e1e1e' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '24px', backgroundColor: '#1e1e1e', color: '#e8e8e8' }}>
        <h1>Main Content</h1>
        <p>This is your results or profile area.</p>
      </main>
    </div>
  );
}
