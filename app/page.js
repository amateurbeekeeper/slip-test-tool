import SlipTestPanel from '../components/SlipTestPanel';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '48px 16px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <SlipTestPanel />
      </div>
    </div>
  );
}
